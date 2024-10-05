import { StyledButton, StyledButtonsPanel } from "../ui/UIComponents";

export default function EditPost() {
  return (
    <>
      <div>Edit Post</div>
      <StyledButtonsPanel>
        <StyledButton actionType="cancel" />
        <StyledButton actionType="confirm" />
      </StyledButtonsPanel>
    </>
  );
}
