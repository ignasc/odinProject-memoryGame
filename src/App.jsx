import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ScoreBoard from './components/ScoreBoard.jsx'
import CardBoard from './components/CardBoard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ScoreBoard />
      <CardBoard />
   </>
  )
}

export default App
