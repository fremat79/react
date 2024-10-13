import Draggable from "react-draggable";
import "./App.css";
import Post from "./components/Post";
import WowBoards from "./components/WowBoards";
import { useState } from "react";

function calculateRandomPositions(numPosts, maxWidth, maxHeight, minSpacing) {
  const positions = [];

  function isOverlapping(x, y) {
    for (const pos of positions) {
      const dx = x - parseFloat(pos.left);
      const dy = y - parseFloat(pos.top);
      if (Math.sqrt(dx * dx + dy * dy) < minSpacing) {
        return true;
      }
    }
    return false;
  }

  for (let i = 0; i < numPosts; i++) {
    let x, y;
    do {
      x = Math.random() * maxWidth;
      y = Math.random() * maxHeight;
    } while (isOverlapping(x, y));
    positions.push({ top: `${y}px`, left: `${x}px` });
  }

  return positions;
}

function App() {
  const numPosts = 1; // Number of Post components
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  const minSpacing = 20; // Minimum spacing between posts

  const positions = calculateRandomPositions(
    numPosts,
    maxWidth,
    maxHeight,
    minSpacing
  );

  return (
    <>
      <WowBoards />
    </>
  );
}

export default App;
