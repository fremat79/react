import { StyledImageContainer, StyledPreviewImage } from "./UIComponents";

export default function PostPreview({ active, postIndex }) {
  return (
    <StyledImageContainer>
      <StyledPreviewImage
        data-postindex={postIndex}
        active={active}
        src={`./wowPosts/wow${postIndex}.svg`}
        alt="wow"
      />
    </StyledImageContainer>
  );
}
