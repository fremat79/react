import styled from "styled-components";

const StyledButtonsPanel = styled.div`
  display: flex;
  justify-content: end;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    switch (props.actionType) {
      case "cancel":
        return "var(--cancel-bg-color)";
      case "confirm":
        return "var(--confirm-bg-color)";
      default:
        return props.bgColor;
    }
  }};
  color: white;
  font-size: 24px;
  font-weight: 800;
  font-style: bold;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: 10px;
`;

const StyledInput = styled.textarea`
  font-family: inherit;
  font-size: 3rem;
  resize: none;
  border: 2px solid #000;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  font-family: inherit;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  /* grid-template-columns: auto auto;
  grid-template-rows: auto auto; */
  flex-direction: column;
  overflow: hidden;
  font-family: "Reenie Beanie", cursive;
  font-size: 1.4rem;
  padding: 10px;
`;

const StyledPreviewPanel = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-right: 10px;
`;

const StyledPreviewImage = styled.img`
  width: 50px;
  height: 50px;
  box-shadow: ${({ active }) =>
    active ? "0 0 30px rgba(0, 255, 0, 0.5)" : "0 0 10px rgba(0, 0, 0, 0.5)"};
  border-radius: 7%;
  padding: 5px;
  transition: all 0.4s ease-in;
  cursor: pointer;
  position: absolute; /* Absolute positioning */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the image */

  &:hover {
    box-shadow: ${({ active }) =>
      active
        ? "0 0 30px rgba(0, 255, 0, 0.5)"
        : "0 0 20px rgba(17, 0, 255, 0.5);"};
    width: 80px; /* Increase image size on hover */
    height: 80px; /* Increase image size on hover */
  }
`;

const StyledImageContainer = styled.div`
  width: 80px; /* Fixed size to accommodate the largest image size */
  height: 80px; /* Fixed size to accommodate the largest image size */
  position: relative; /* Relative positioning for absolute child */
`;

export {
  StyledButtonsPanel,
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledForm,
  StyledPreviewPanel,
  StyledPreviewImage,
  StyledImageContainer,
};
