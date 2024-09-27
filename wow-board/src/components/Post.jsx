import { useEffect, useState } from "react";
import Draggable from "react-draggable";

export default function Post({ postTypeId, postKey, style }) {
  const [postState, setPostState] = useState({
    typeId: postTypeId ?? Math.floor(Math.random() * 8 + 1),
    style: {
      ...style,
      position: "absolute",
      transform: Math.random() * 34 - 12,
    },
    position: { x: 0, y: 0 },
  });

  function handleStopDrag(e, data, index) {
    setPostState({ ...postState, position: { x: data.x, y: data.y } });
  }

  console.log(postState);

  return (
    <Draggable
      key={postKey}
      onStop={(e, data) => handleStopDrag(e, data, postKey)}
    >
      <div className="draggable">
        <div style={postState.style} className="image-container">
          <img src={`./wowPosts/wow${postState.typeId}.svg`} alt="post" />
          <div className={`overlay-text overlay-text-${postState.typeId}`}>
            Lorem Ipsum è un testo segnaposto utilizzato nel settore della
            dasdasdasds dasd asdasdasd
          </div>
        </div>
      </div>
    </Draggable>
  );
}
