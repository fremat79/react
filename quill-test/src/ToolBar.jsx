import React from "react";

export default function ToolBar({ onAddEmoji }) {
  return (
    <div id="my-quill-toolbar">
      <button className="ql-bold"></button>
      <button
        type="button"
        style={{ padding: 0 }}
        onClick={() => onAddEmoji("1f600")}
      >
        <img
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif"
          alt="😀"
          width="24"
          height="24"
        />
      </button>
    </div>
  );
}
