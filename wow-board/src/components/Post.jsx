import DOMPurify from "dompurify";
import { useState } from "react";
import styled from "styled-components";
import { postToHtml } from "./ui/EmojiBolt";

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

const StyledOverlayText = styled.div`
  position: absolute;
  color: black;
  pointer-events: auto; /* Ensure the text doesn't interfere with image interactions */
  font-family: "Reenie Beanie", cursive;
  font-size: 35px;
  font-weight: 700;
  &.overlay-text-1 {
    cursor: move;
    top: 80px;
    left: 60px;
    width: 250px;
    height: 200px;
  }
  &.overlay-text-2 {
    top: 60px;
    left: 40px;
    width: 240px;
    height: 300px;
    cursor: move;
  }

  &.overlay-text-3 {
    top: 50px;
    left: 14px;
    width: 225px;
    height: 250px;
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
    transform: rotate(3deg);
    cursor: move;
  }

  &.overlay-text-4 {
    top: 65px;
    left: 34px;
    width: 260px;
    height: 240px;
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
    cursor: move;
  }

  &.overlay-text-5 {
    top: 65px;
    left: 34px;
    width: 260px;
    height: 240px;
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
    cursor: move;
  }

  &.overlay-text-6 {
    top: 65px;
    left: 34px;
    width: 260px;
    height: 150px;
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
    cursor: move;
  }

  &.overlay-text-7 {
    top: 55px;
    left: 14px;
    width: 250px;
    height: 210px;
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
    cursor: move;
  }

  &.overlay-text-8 {
    top: 35px;
    left: 14px;
    width: 300px;
    height: 225px;
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
    cursor: move;
  }

  &:focus {
    outline: none;
  }
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

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(postToHtml(settings.content));

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
        <StyledOverlayText
          className={`overlay-text-${postState.typeId}`}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </>
  );
}
