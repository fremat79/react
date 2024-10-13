import "react-quill/dist/quill.snow.css"; // Import the styles for the editor
import ReactQuill, { Quill } from "react-quill";
import styled from "styled-components";
//import EmojiBlot from "../ui/EmojiBolt"; // Import the custom blot
import React, { useCallback, useEffect, useRef, useState } from "react";
import { EmojiCodes } from "../ui/EmojiList";
import { transformContent } from "../Post";
import DOMPurify from "dompurify";

function EmojiButton({ emojiCode, onInsert }) {
  const StyleEmojiBtn = styled.button`
    margin: 10px;
  `;
  const StyleEmojiImg = styled.img`
    width: 32px;
    height: 32px;
  `;

  return (
    <StyleEmojiBtn
      onClick={(e) => {
        e.preventDefault();
        onInsert(emojiCode);
      }}
    >
      <StyleEmojiImg
        src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${emojiCode}/512.gif`}
      />
    </StyleEmojiBtn>
  );
}
const CustomToolbar = React.memo(({ onInsert }) => {
  return (
    <div id="toolbar">
      {EmojiCodes.map((emojiCode) => (
        <EmojiButton onInsert={onInsert} emojiCode={emojiCode} />
      ))}
    </div>
  );
});

export default function PostEditor({ postContent = "", setPostContent }) {
  const quillRef = useRef(null);
  // const modules = {
  //   toolbar: {
  //     container: "#toolbar",
  //   },
  // };

  function handleChange(value) {
    console.log("handleChange", value);
    setPostContent(value);
  }

  //const htmlPostContent = DOMPurify.sanitize(transformContent(content));

  //Quill.register(EmojiBlot);

  console.log("PostEditor", postContent);

  return (
    <div className="quill-editor-container">
      {/* <CustomToolbar onInsert={insertEmoji} /> */}
      <ReactQuill
        ref={quillRef}
        value={postContent}
        onChange={(e) => handleChange(e)}
        // modules={modules}
      />
    </div>
  );
}
