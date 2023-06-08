import { Editor } from "@tinymce/tinymce-react";

type OnEditorChange = (newValue: string) => void;

export interface RichTextEditorInputProps {
  id?: string;
  value?: string;
  placeholder?: string;
  inline?: boolean;
  imageUploadPath?: string;
  onEditorChange?: OnEditorChange;
  minHeight?: number | string;
  noBorder?: boolean;
  iframeEmbed?: boolean;
}

function RichTextEditor({
  id,
  value,
  placeholder = "Type here...",
  inline,
  imageUploadPath,
  onEditorChange,
  minHeight = 480,
  noBorder,
  iframeEmbed
}: RichTextEditorInputProps) {
  if (typeof window === "undefined") {
    return null;
  }

  // if (!ready) {
  //   return <div className="py-3 text-center text-muted">Loading editor...</div>;
  // }

  return (
    <Editor
      id={id}
      tinymceScriptSrc={`${location.origin}/tinymce/tinymce.min.js`}
      value={value}
      onEditorChange={(newValue, editor) => {
        //formik.setFieldValue("body", newValue)
        onEditorChange?.(newValue);
      }}
      onInit={(evt, editor) => {
        //editorRef.current = editor;

        editor
          .getContainer()
          .getElementsByClassName("tox-edit-area__iframe")
          .item(0)
          ?.setAttribute("style", "background-color: #f9fafb");
        editor.getContainer().style.borderRadius = "0.15rem 0.15rem";
        editor.getContainer().style.border = `${
          noBorder ? 0 : 1
        }px solid rgba(0, 0, 0, 0.125)`;
      }}
      init={{
        paste_data_images: false,
        placeholder: placeholder,
        height: minHeight,
        menubar: false,
        inline: inline ?? false,
        skin: "tinymce-5",
        link_default_target: "_blank",
        help_tabs: ["shortcuts"],
        media_alt_source: false,
        media_dimensions: false,
        media_poster: false,
        images_upload_handler: (info, progress) => {
          return new Promise<string>((resolve, reject) => {
            //console.log(info.blob().size);

            reject("Not implemented yet.");
          });
        },
        content_style:
          "body { font-family: Inter, Noto Sans Myanmar UI, Helvetica, Arial, sans-serif; font-size: 16px; }",
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
          "code",
          "media",
          "autolink",
          "help"
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
          iframeEmbed
            ? {
                name: "media",
                items: ["media"]
              }
            : { name: "media", items: [] },
          { name: "view", items: ["preview", "fullscreen", "help"] }
        ]
      }}
    />
  );
}

export default RichTextEditor;
