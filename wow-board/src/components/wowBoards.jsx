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
      const response = await fetch("http://localhost:3001/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchData();
  }, []);

  function handleStopDrag(e, data, index) {
    console.log("handle post stop drag", posts[index].content, data.x, data.y);
  }

  return (
    <div className="wowBoard">
      {posts.map((post, index) => (
        <Draggable
          key={index}
          onStop={(e, data) => handleStopDrag(e, data, index)}
        >
          <div className="draggable">
            <Post content={post.content}></Post>
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
          <AddPost />
        </Modal>
      )}
    </div>
  );
}
