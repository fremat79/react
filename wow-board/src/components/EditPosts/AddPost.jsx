import { useState } from "react";
import styled from "styled-components";
import {
  StyledButton,
  StyledButtonsPanel,
  StyledInput,
  StyledLabel,
} from "../ui/UIComponents";

const StyledForm = styled.form`
  display: flex;
  /* grid-template-columns: auto auto;
  grid-template-rows: auto auto; */
  flex-direction: column;
  overflow: hidden;
  font-family: "Reenie Beanie", cursive;
  font-size: 1.4rem;
`;

export default function AddPost({ onClose }) {
  const [postContent, setPostContent] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (postContent === "") {
      onClose();
      return;
    }

    const postType = Math.floor(Math.random() * 8 + 1);
    const postRotation = Math.floor(Math.random() * 34 - 12);

    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        style: { type: postType, rotation: postRotation },
        content: postContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally, reset the textarea after successful submission
        setPostContent("");
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="post">
        <span>
          Aggiungi qualcosa d'<b>interessante</b>
        </span>
      </StyledLabel>
      <StyledInput
        maxLength={200}
        id="post"
        type="textarea"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <StyledButtonsPanel>
        <StyledButton actionType="cancel" type="button" onClick={onClose} />
        <StyledButton actionType="confirm" type="submit" />
      </StyledButtonsPanel>
    </StyledForm>
  );
}
