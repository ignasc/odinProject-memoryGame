import './css/resetcss.css';
import './css/darkAndLightThemes.css';
import './css/styles.css';

import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import ScoreBoard from './components/ScoreBoard.jsx';
import CardBoard from './components/CardBoard.jsx';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [themeClass, setThemeClass] = useState('light');
  document.body.classList.add('light');

  function incrementScore(setValue) {
    if (setValue === 0) {
      setCurrentScore(0);
    } else {
      console.log(`Adding one point to ${currentScore}`);
      setCurrentScore(currentScore + 1);
    }
  }
  useEffect(() => {
    if (currentScore > bestScore) {
      console.log(`New best score!`);
      setBestScore(currentScore);
    }
  }, [currentScore]);

  function resetScore() {
    setCurrentScore(0);
  }

  return (
    <>
      <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
      <CardBoard incrementScore={incrementScore} setBestScore={setBestScore} />
    </>
  );
}

export default App;
