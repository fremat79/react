import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  /* grid-template-columns: auto auto;
  grid-template-rows: auto auto; */
  flex-direction: column;
  overflow: hidden;
  font-family: "Reenie Beanie", cursive;
  font-size: 1.4rem;
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

const StyledButtonsPanel = styled.div`
  display: flex;
  justify-content: end;
`;

const StyledAddButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bgColor};
  color: white;
  font-size: 24px;
  font-weight: 800;
  font-style: bold;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: 10px;
`;

export default function AddPost() {
  const confirmPostColor = `rgb(63, 218, 2)`;
  const cancelPostColor = `rgb(255, 99, 71)`;

  return (
    <StyledForm>
      <StyledLabel htmlFor="post">
        <span>
          Aggiungi qualcosa di <b>interessante</b>
        </span>
      </StyledLabel>
      <StyledInput maxLength={20} id="post" type="textarea" />
      <StyledButtonsPanel>
        <StyledAddButton bgColor={cancelPostColor} type="submit" />
        <StyledAddButton bgColor={confirmPostColor} type="submit" />
      </StyledButtonsPanel>
    </StyledForm>
  );
}
