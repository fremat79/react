export default function EmojiButton({ emojiCode, onAddEmoji }) {
  return (
    <button
      type="button"
      style={{ padding: 0 }}
      onClick={() => onAddEmoji(emojiCode)}
    >
      <img
        src={`emoji/${emojiCode}.gif`}
        data-code={emojiCode}
        alt="emoji"
        class="emoji"
      />
    </button>
  );
}
