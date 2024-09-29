import { useState } from "react";

export default function Post({ postTypeId, postKey, style, content }) {
  const [postState, setPostState] = useState({
    typeId: postTypeId ?? Math.floor(Math.random() * 8 + 1),
    style: {
      ...style,
      position: "absolute",
      transform: `rotate(${Math.random() * 34 - 12}deg)`,
    },
    position: { x: 0, y: 0 },
  });

  return (
    <div style={postState.style} className="image-container">
      <img src={`./wowPosts/wow${postState.typeId}.svg`} alt="post" />
      <div className={`overlay-text overlay-text-${postState.typeId}`}>
        {content}
      </div>
    </div>
  );
}
