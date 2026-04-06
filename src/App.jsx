import './css/resetcss.css';
import './css/darkAndLightThemes.css';
import './css/styles.css';

import { useState } from 'react';
import ScoreBoard from './components/ScoreBoard.jsx';
import CardBoard from './components/CardBoard.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [score, setScore] = useState({ current: 0, best: 0 });

  document.body.classList.add('light');

  function incrementScore(setValue) {
    if (setValue === -1) {
      setScore((prev) => {
        return {
          ...prev,
          current: 0,
        };
      });
    } else {
      setScore((prev) => {
        const newCurrent = prev.current + 1;
        return {
          current: newCurrent,
          best: newCurrent > prev.best ? newCurrent : prev.best,
        };
      });
    }
  }

  return (
    <>
      <ScoreBoard currentScore={score.current} bestScore={score.best} />
      <CardBoard incrementScore={incrementScore} />
      <Footer />
    </>
  );
}

export default App;
