//css
import './App.css'

//react
import { useCallback, useEffect, useState } from "react";

// data
import { wordsList } from './data/words';

//components
import StartScreen from './components/StartScreen/StartScreen';
import End from './components/End/End';
import Game from './components/Game/Game';

const stages: { id: number; name: string}[] = [
  {id: 1, name:"start"},
  {id: 2, name:"game"},
  {id: 3, name:"end"}
]

function App() {
  const [gameStage, setGameStage] = useState<string>(stages[0].name);
  const words = useState<typeof wordsList>(wordsList);

  // start game
  const startGame = () => {
    setGameStage(stages[1].name);
  }

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  // restarts the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
      {gameStage === 'end' && <End retry={retry}/>}
    </div>
  )
}

export default App
