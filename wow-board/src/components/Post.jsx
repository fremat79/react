import { useState } from "react";

export default function Post({ settings }) {
  const [postState, setPostState] = useState({
    typeId: settings.style.type ?? Math.floor(Math.random() * 8 + 1),
    style: {
      position: "absolute",
      // transform: `rotate(${Math.random() * 34 - 12}deg)`,
      transform: `rotate(${settings.style.rotation}deg)`,
    },
    // position: { x: 0, y: 0 },
  });

  return (
    <div style={postState.style} className="image-container">
      <img src={`./wowPosts/wow${postState.typeId}.svg`} alt="post" />
      <div className={`overlay-text overlay-text-${postState.typeId}`}>
        {settings.content}
      </div>
    </div>
  );
}
