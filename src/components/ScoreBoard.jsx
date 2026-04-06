import ButtonToggleTheme from './ButtonToggleTheme.jsx';

function ScoreBoard({ currentScore, bestScore }) {
  // const currentScore = 0;
  // const bestScore = 99;
  return (
    <header>
      <ButtonToggleTheme />
      <div>
        <p>Current score: {currentScore}</p>
        <p>Best score: {bestScore}</p>
      </div>
    </header>
  );
}

export default ScoreBoard;
