export default function Post({ style }) {
  return (
    <div style={style} className="image-container">
      <img src="./wowPosts/wow1.svg" alt="post" />
      <div className="overlay-text">
        Lorem Ipsum è un testo segnaposto utilizzato nel settore della
        dasdasdasds dasd asdasdasd
        <a href="https://emoji.gg/emoji/49142-milkandmochalove6">
          <img
            src="https://cdn3.emoji.gg/emojis/49142-milkandmochalove6.gif"
            width="64px"
            height="64px"
            alt="milkandmochalove6"
          />
        </a>
      </div>
    </div>
  );
}
