import { useState } from "react";
import {
  StyledButton,
  StyledButtonsPanel,
  StyledForm,
  StyledLabel,
  StyledPreviewPanel,
} from "../ui/UIComponents";
import PostPreview from "../ui/PostPreview";
import PostEditor from "./PostEditor";

export default function AddPost({ addNewPost, onClose, post = null }) {
  const [postContent, setPostContent] = useState(post ? post.content : "");
  const [postType, setPostType] = useState(post ? post.style.type : 1);
  const actionType = post ? "edit" : "add";

  function handleSubmit(event) {
    event.preventDefault();

    if (postContent === "") {
      onClose();
      return;
    }

    if (actionType === "add") {
      const postRotation = Math.floor(Math.random() * 34 - 12);

      const newPost = {
        style: { type: postType, rotation: postRotation },
        content: postContent,
      };

      fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => {
          // Optionally, reset the textarea after successful submission
          setPostContent("");
          addNewPost({ ...newPost, position: { x: 10, y: 10 } });
          onClose(actionType);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    if (actionType === "edit") {
      post.content = postContent;
      post.style.type = postType;

      fetch(`http://localhost:3001/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: postContent,
          style: { type: postType },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Optionally, reset the textarea after successful submission
          setPostContent("");
          onClose(actionType);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function handlePreviewClick(e) {
    const index = Number(e.target.dataset.postindex);
    setPostType(index);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="post">
        <span>
          Aggiungi qualcosa d'<b>interessante</b>
        </span>
      </StyledLabel>
      <PostEditor postContent={postContent} setPostContent={setPostContent} />

      <StyledPreviewPanel onClick={handlePreviewClick}>
        <PostPreview postIndex={1} active={postType ? postType === 1 : false} />
        <PostPreview postIndex={2} active={postType ? postType === 2 : false} />
        <PostPreview postIndex={3} active={postType ? postType === 3 : false} />
        <PostPreview postIndex={4} active={postType ? postType === 4 : false} />
        <PostPreview postIndex={5} active={postType ? postType === 5 : false} />
        <PostPreview postIndex={6} active={postType ? postType === 6 : false} />
        <PostPreview postIndex={7} active={postType ? postType === 7 : false} />
        <PostPreview postIndex={8} active={postType ? postType === 8 : false} />
      </StyledPreviewPanel>
      <StyledButtonsPanel>
        <StyledButton
          actionType="cancel"
          type="button"
          onClick={() => onClose(actionType)}
        />
        <StyledButton actionType="confirm" type="submit" />
      </StyledButtonsPanel>
    </StyledForm>
  );
}
