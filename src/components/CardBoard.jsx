import Card from './Card.jsx';

function CardBoard({ incrementScore, setBestScore, resetScore }) {
  const arrayOfCards = [];

  for (let index = 0; index < 3; index++) {
    arrayOfCards.push(
      <Card incrementScore={incrementScore} resetScore={resetScore} />
    );
  }

  return (
    <ul className="cardContainer">
      {arrayOfCards.map((element, index) => {
        return <li key={index}>{element}</li>;
      })}
    </ul>
  );
}

export default CardBoard;
