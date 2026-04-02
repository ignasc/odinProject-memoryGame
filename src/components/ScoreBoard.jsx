function ScoreBoard({ currentScore, bestScore }) {
  // const currentScore = 0;
  // const bestScore = 99;
  return (
    <div>
      <p>Current score: {currentScore}</p>
      <p>Best score: {bestScore}</p>
    </div>
  );
}

export default ScoreBoard;
