import { useState } from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff00006a;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.848);
  transition: opacity 0.4s ease;
  text-align: center;
  font-size: 60px;
  color: #fff;
  font-weight: bold;
  font-family: "Reenie Beanie", cursive;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export default function Post({ settings }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const postState = {
    typeId: settings.style.type ?? Math.floor(Math.random() * 8 + 1),
    style: {
      position: "absolute",
      transform: `rotate(${settings.style.rotation}deg)`,
    },
  };

  const handleMouseEnter = () => {
    setIsOverlayVisible(true);
  };
  const handleMouseLeave = () => {
    setIsOverlayVisible(false);
  };

  return (
    <>
      <div
        style={postState.style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="image-container"
      >
        <StyledOverlay visible={isOverlayVisible}>x</StyledOverlay>
        <img src={`./wowPosts/wow${postState.typeId}.svg`} alt="post" />
        <div className={`overlay-text overlay-text-${postState.typeId}`}>
          {settings.content}
        </div>
      </div>
    </>
  );
}
