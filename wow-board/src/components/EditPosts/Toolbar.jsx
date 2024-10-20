import React from "react";
import EmojiButton from "./EmojiButton";

export default function ToolBar({ onAddEmoji }) {
  return (
    <div id="my-quill-toolbar">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <EmojiButton emojiCode="1f44d" onAddEmoji={onAddEmoji} />
      <EmojiButton emojiCode="1f44e" onAddEmoji={onAddEmoji} />
      <EmojiButton emojiCode="1f62d" onAddEmoji={onAddEmoji} />
      <EmojiButton emojiCode="1f600" onAddEmoji={onAddEmoji} />
      <EmojiButton emojiCode="1f609" onAddEmoji={onAddEmoji} />
      <EmojiButton emojiCode="1f929" onAddEmoji={onAddEmoji} />
      <EmojiButton emojiCode="1f92c" onAddEmoji={onAddEmoji} />
      <EmojiButton emojiCode="1f631" onAddEmoji={onAddEmoji} />
    </div>
  );
}
