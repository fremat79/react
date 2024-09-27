import { useEffect, useState } from 'react';

export default function Post({ id, style }) {
  const [isVisible, setIsVisible] = useState(false);
  const randomAngle = Math.random() * 34 - 12; // Generates a number between -12 and 12
  const randomPostId = id ?? Math.floor(Math.random() * 8 + 1); // Generates a number between 1 and 2
  const styleRotated = {
    ...style,
    position: 'absolute',
    transform: `rotate(${randomAngle}deg)`,
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsVisible(true);
  //   }, 500);
  // }, []);

  return (
    <div style={styleRotated} className="image-container">
      <img src={`./wowPosts/wow${randomPostId}.svg`} alt="post" />
      <div className={`overlay-text overlay-text-${randomPostId}`}>
        Lorem Ipsum è un testo segnaposto utilizzato nel settore della
        dasdasdasds dasd asdasdasd
      </div>
    </div>
  );
}
