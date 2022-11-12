import { Editor } from "@tinymce/tinymce-react";

type OnEditorChange = (newValue: string) => void;

export interface RichTextEditorInputProps {
  id?: string;
  placeholder?: string;
  inline?: boolean;
  imageUploadPath?: string;
  onEditorChange?: OnEditorChange;
  minHeight?: number | string;
  noBorder?: boolean;
}

function RichTextEditor({
  id,
  placeholder = "Type here...",
  inline,
  imageUploadPath,
  onEditorChange,
  minHeight = 480,
  noBorder
}: RichTextEditorInputProps) {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Editor
      id={id}
      tinymceScriptSrc={`${location.origin}/tinymce/tinymce.min.js`}
      value=""
      onEditorChange={(newValue, editor) => {
        //formik.setFieldValue("body", newValue)
        onEditorChange && onEditorChange(newValue);
      }}
      onInit={(evt, editor) => {
        //editorRef.current = editor;

        editor
          .getContainer()
          .getElementsByClassName("tox-edit-area__iframe")
          .item(0)
          ?.setAttribute("style", "background-color: #f9fafb");
        editor.getContainer().style.borderRadius = "0.25rem 0.25rem";
        editor.getContainer().style.border = `${
          noBorder ? 0 : 1
        }px solid rgba(0, 0, 0, 0.125)`;
      }}
      init={{
        placeholder: placeholder,
        height: minHeight,
        menubar: false,
        inline: inline ?? false,
        skin: "tinymce-5",
        images_upload_handler: (info, progress) => {
          return new Promise<string>((resolve, reject) => {
            console.log(info.blob().size);

            reject("Not implemented yet.");
          });
        },
        content_style:
          "body { font-family: Noto Sans Myanmar UI, Helvetica, Arial, sans-serif; font-size: 16px; }",
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar:
          "blocks | bold italic underline strikethrough",
        plugins: [
          "preview",
          "fullscreen",
          "wordcount",
          "link",
          "lists",
          "preview",
          "quickbars",
          "table",
          "code"
        ],
        menu: {
          file: { title: "File", items: "preview" },
          edit: {
            title: "Edit",
            items: "undo redo | cut copy paste | selectall | searchreplace"
          },
          view: {
            title: "View",
            items:
              "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen"
          },
          insert: {
            title: "Insert",
            items:
              "link template inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime"
          },
          format: {
            title: "Format",
            items:
              "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | removeformat"
          },
          tools: {
            title: "Tools",
            items: "spellchecker spellcheckerlanguage | code wordcount"
          },
          table: {
            title: "Table",
            items: "inserttable | cell row column | tableprops deletetable"
          },
          help: { title: "Help", items: "help" }
        },
        toolbar: [
          //   { name: "history", items: ["undo", "redo"] },
          { name: "styles", items: ["blocks"] },
          {
            name: "formatting",
            items: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "bullist",
              "numlist",
              "table"
            ]
          },
          {
            name: "alignment",
            items: ["align"]
          },
          {
            name: "indentation",
            items: ["outdent", "indent"]
          },
          { name: "view", items: ["preview", "fullscreen", "code"] }
        ]
      }}
    />
  );
}

export default RichTextEditor;
