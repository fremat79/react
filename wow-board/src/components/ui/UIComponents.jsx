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

export { StyledButtonsPanel, StyledButton, StyledInput, StyledLabel };
