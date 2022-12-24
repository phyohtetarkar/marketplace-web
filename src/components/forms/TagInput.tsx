import { XMarkIcon } from "@heroicons/react/24/outline";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { formControlHeight } from "../../common/app.config";

interface TagInputProps {
  data: string[];
  placeholder?: string;
  onTagsChange?: (tags: string[]) => void;
}

interface TagValues {
  index: number;
  name: string;
  onRemove?: (index: number) => void;
}

function Tag({ index, name, onRemove }: TagValues) {
  return (
    <div
      className="hstack align-self-center bg-primary rounded px-2 m-1"
      style={{ height: 26 }}
    >
      <div className="small text-light">{name}</div>
      <a
        href="#"
        className="ms-2 dark-link"
        onClick={(e) => {
          e.preventDefault();
          onRemove && onRemove(index);
        }}
      >
        <XMarkIcon width={14} strokeWidth={3.5} />
      </a>
    </div>
  );
}

function TagInput({ data = [], placeholder, onTagsChange }: TagInputProps) {
  const [focus, setFocus] = useState(false);
  const [tags, setTags] = useState(data);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onTagsChange && onTagsChange(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (!inputRef.current) {
        return;
      }
      const value = inputRef.current?.value;
      inputRef.current!.value = "";

      if (!value || value.trim().length === 0) {
        return;
      }

      const oldTags = [...tags];

      const oldValue = oldTags.find((t) => t === value);

      if (oldValue) {
        return;
      }

      setTags((old) => [...old, value]);

      inputRef.current!.value = "";
    }

    // else if (e.key === "Backspace") {
    //   const value = inputRef.current?.value;
    //   tags.length > 0 && !value?.length && handleRemove(tags.length - 1);
    // }
  }

  function handleRemove(index: number) {
    const oldTags = [...tags];
    oldTags.splice(index, 1);
    setTags(oldTags);
  }

  return (
    <div
      className={`px-3 border rounded form-control d-flex flex-wrap align-items-center ${
        focus ? "border-primary" : ""
      }`}
      onFocus={() => {
        setFocus(true);
        inputRef.current?.focus();
      }}
      tabIndex={0}
      onBlur={() => setFocus(false)}
      style={{
        minHeight: formControlHeight
      }}
    >
      {tags.map((e, i) => {
        return <Tag key={i} index={i} name={e} onRemove={handleRemove} />;
      })}
      <input
        ref={inputRef}
        type="text"
        className="border-0 bg-transparent"
        size={10}
        placeholder={placeholder ?? "Add tag"}
        style={{ outline: "none" }}
        onFocus={(_evt) => {
          setFocus(true);
        }}
        onBlur={(_evt) => {
          setFocus(false);
        }}
        onKeyUp={handleKey}
      />
    </div>
  );
}

export default TagInput;
