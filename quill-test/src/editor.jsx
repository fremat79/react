import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ToolBar from "./ToolBar";

export default function Editor() {
  const [value, setValue] = useState("");
  const quillEditor = useRef(null);

  const modules = {
    toolbar: {
      container: "#my-quill-toolbar",
    },
  };

  function handleAddEmoji(emojiCode) {
    if (quillEditor.current) {
      const quill = quillEditor.current.getEditor();
      const range = quill.getSelection();
      const customClass = "emoji"; // Add your custom class here
      const imageUrl =
        "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif"; // Replace with your image URL

      quill.clipboard.dangerouslyPasteHTML(
        0,
        `<img src="${imageUrl}" class="${customClass}" />`
      );
    }
  }

  //return <ReactQuill theme="snow" value={value} onChange={setValue} />;
  return (
    <div className="text-editor">
      <ToolBar onAddEmoji={handleAddEmoji} />
      <ReactQuill
        ref={quillEditor}
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
      ></ReactQuill>
    </div>
  );
}
