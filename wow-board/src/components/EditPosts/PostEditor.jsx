import "react-quill/dist/quill.snow.css"; // Import the styles for the editor
import ReactQuill, { Quill } from "react-quill";

import React, { useRef, useState } from "react";
import ToolBar from "./Toolbar";

var Image = Quill.import("formats/image");
Image.className = "emoji";
Quill.register(Image, true);

export default function PostEditor({ postContent = "", setPostContent }) {
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
      const imageUrl = `Emoji/${emojiCode}.gif`;

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
        value={postContent}
        onChange={setPostContent}
      ></ReactQuill>
    </div>
  );
}
