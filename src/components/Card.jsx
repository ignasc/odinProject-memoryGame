import img_noImage from '../assets/no-image-icon-23494.png';
import { useState } from 'react';

function Card({
  incrementScore,
  imgSrc = null,
  cardUrl = null,
  cardName = null,
}) {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  function handleClick() {
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
      <img src={cardUrl ? cardUrl : img_noImage} alt="" />
      <p>
        {cardName} {hasBeenClicked && `clicked`}
      </p>
    </div>
  );
}

export default Card;
