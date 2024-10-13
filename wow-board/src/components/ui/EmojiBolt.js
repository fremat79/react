// import Quill from "quill";

// const Embed = Quill.import("blots/embed");

// export default class EmojiBlot extends Embed {
//   static create(value) {
//     console.log("EmojiBolt create", value);

//     let node = super.create();
//     node.setAttribute(
//       "src",
//       `https://fonts.gstatic.com/s/e/notoemoji/latest/${value.code}/512.gif`
//     );
//     node.setAttribute("alt", "emoji");
//     node.style.width = value.width || "32px";
//     node.style.height = value.height || "32px";
//     return node;
//   }

//   static value(node) {
//     console.log("EmojiBolt value", node);

//     const emojiCode = node.getAttribute("code");
//     return {
//       url: `https://fonts.gstatic.com/s/e/notoemoji/latest/${emojiCode}/512.gif`,
//       width: node.style.width,
//       height: node.style.height,
//     };
//   }
// }

// EmojiBlot.blotName = "emoji";
// EmojiBlot.tagName = "img";

function postToHtml(content) {
  const emojiRegex = /<emoji code='(.*?)'>/g;
  const transformedContent = content.replace(emojiRegex, (match, p1) => {
    return `<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/${p1}/512.gif" class="emoji" alt="emoji" width="32" height="32" />`;
  });
  return transformedContent;
}

function htmlToPost(content) {
  // Define the regular expression to match <img> tags with the emoji code in the src attribute
  const imgTagRegex =
    /<img[^>]*src="https:\/\/fonts\.gstatic\.com\/s\/e\/notoemoji\/latest\/([0-9a-f]+)\/512\.gif"[^>]*>/g;

  // Replace the <img> tags with <emoji> tags
  const updatedContent = content.replace(imgTagRegex, (match, code) => {
    return `<emoji code='${code}'>`;
  });

  return updatedContent;
}

export { postToHtml, htmlToPost };
