import img_noImage from '../assets/no-image-icon-23494.png';
import { useState } from 'react';

function Card({ incrementScore, imgSrc = null }) {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  function handleClick() {
    console.log(`Current state is ${hasBeenClicked}`);
    if (!hasBeenClicked) {
      incrementScore();
      setHasBeenClicked(true);
    } else {
      incrementScore(0);
      setHasBeenClicked(false);
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={imgSrc ? imgSrc : img_noImage} alt="no image found" />
      <p>Card component {hasBeenClicked && `clicked`}</p>
    </div>
  );
}

export default Card;
