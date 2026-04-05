import img_noImage from '../assets/no-image-icon-23494.png';

function Card({ cardId, cardUrl = null, cardName = null, handleCardClick }) {
  function handleClick() {
    handleCardClick(cardId);
  }
  return (
    <div className="card" onClick={handleClick}>
      <img src={cardUrl ? cardUrl : img_noImage} alt="" />
      <p>{cardName}</p>
    </div>
  );
}

export default Card;
