import { useState } from "react";
import styled from "styled-components";

const StyleOverlayContainer = styled.div`
  display: flex;

  position: absolute;
  gap: 10px;
  bottom: 20px;
  right: 20px;
  color: #fff;
  font-weight: bold;
  font-family: "Reenie Beanie", cursive;
  cursor: pointer;
  z-index: 10;
`;

const StyledOverlay = styled.div`
  display: flex;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  background-color: ${(props) => props.color};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.848);
  transition: opacity 0.4s ease;
  text-align: center;

  justify-content: center;
  align-items: center;
`;

export default function Post({ onAction, settings }) {
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
        <StyleOverlayContainer>
          <StyledOverlay
            onClick={() => onAction({ action: "edit", id: settings.id })}
            color="#0a010171"
            visible={isOverlayVisible}
          >
            ✏️
          </StyledOverlay>
          <StyledOverlay
            onClick={() => onAction({ action: "remove", id: settings.id })}
            color="#ff00006a"
            visible={isOverlayVisible}
          >
            ❌
          </StyledOverlay>
        </StyleOverlayContainer>
        <img src={`./wowPosts/wow${postState.typeId}.svg`} alt="post" />
        <div className={`overlay-text overlay-text-${postState.typeId}`}>
          {settings.content}
        </div>
      </div>
    </>
  );
}
