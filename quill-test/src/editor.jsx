import React, { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ToolBar from "./ToolBar";

var Image = Quill.import("formats/image");
Image.className = "emoji";
Quill.register(Image, true);

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

      if (range) {
        quill.insertEmbed(range.index, "image", imageUrl);
        quill.setSelection(range.index + 1); // Move cursor to the right of the image
      } else {
        quill.insertEmbed(0, "image", imageUrl);
      }
    }
  }

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
