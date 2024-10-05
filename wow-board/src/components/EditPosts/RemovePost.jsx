import { StyledButton, StyledButtonsPanel } from "../ui/UIComponents";

export default function RemovePost({ userData, message, onConfirm }) {
  function handleConfirm() {}

  return (
    <>
      <div>{message}</div>
      <StyledButtonsPanel>
        <StyledButton
          actionType="cancel"
          onClick={() => onConfirm({ userData: userData, cancel: true })}
        />
        <StyledButton
          actionType="confirm"
          onClick={() => onConfirm({ userData: userData, cancel: false })}
        />
      </StyledButtonsPanel>
    </>
  );
}
