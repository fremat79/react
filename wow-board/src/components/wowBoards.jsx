import { useEffect, useState } from "react";
import Post from "./Post";
import Modal from "./Modal";
import AddPost from "./AddPost";
import Draggable from "react-draggable";

export default function WowBoards({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // fetch post from server
      const response = await fetch("http://localhost:3001/posts");
      const data = await response.json();
      // get local post position
      let localPostsPosition = getLocalPostPosition();
      // transform fetched post adding local position and store as state
      let postsState = data.map((post) => {
        const localPost = localPostsPosition.find((p) => p.id === post.id);
        return {
          ...post,
          position: localPost ? localPost.position : { x: 0, y: 0 },
        };
      });

      setPosts(postsState);

      // extract post position from state and store in local storage
      updateLocalPostPosition(postsState);
    }
    fetchData();
  });

  function getLocalPostPosition() {
    const postStorage = localStorage.getItem("posts");
    if (!postStorage) {
      localStorage.setItem("posts", JSON.stringify([]));
      return [];
    }
    return JSON.parse(postStorage);
  }

  function updateLocalPostPosition(postsState) {
    saveLocalPostPosition(
      postsState.map((post) => {
        return { id: post.id, position: post.position };
      })
    );
  }

  function saveLocalPostPosition(postsPosition) {
    localStorage.setItem("posts", JSON.stringify(postsPosition));
  }

  function storePostPosition(id, postPosition) {
    const postsPosition = getLocalPostPosition();
    const post = postsPosition?.find((p) => p.id === id);
    if (!post) {
      postsPosition.push({ id, position: postPosition });
    } else {
      post.position = postPosition;
    }
    saveLocalPostPosition(postsPosition);
  }

  function handleStopDrag(e, data, index) {
    storePostPosition(posts[index].id, { x: data.x, y: data.y });
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="wowBoard">
      {posts.map((post, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: post.position.x, y: post.position.y }}
          onStop={(e, data) => handleStopDrag(e, data, index)}
        >
          <div className="draggable">
            <Post settings={post}></Post>
          </div>
        </Draggable>
      ))}
      <button
        disabled={showModal}
        onClick={() => setShowModal(true)}
        className="addPost"
      >
        +
      </button>
      {showModal && (
        <Modal>
          <AddPost onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
