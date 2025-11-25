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
  const [words] = useState<typeof wordsList>(wordsList);

  const [pickedWord, setPickedWord] = useState<string>("");
  const [pickedCategory, setPickedCategory] = useState<string>("");
  const [letters, setLetters] = useState<string[]>([])

  const pickWordAndCategory = (): { word: string; category: string } => {
    // pick a random category
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    // pick a random word
    const word = 
      words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return {word, category};
  }

  // start game
  const startGame = (): void => {
    // pick word and pick category
    const { word, category } = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name);
  }

  // process the letter input
  const verifyLetter = (): void => {
    setGameStage(stages[2].name);
  }

  // restarts the game
  const retry = (): void => {
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
