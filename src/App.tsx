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
  const [letters, setLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const pickWordAndCategory = useCallback((): { word: string; category: string } => {
    // pick a random category
    const categories = Object.keys(words)
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pick a random word
    const word = 
      words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }, [words]);

  // start game
  const startGame = useCallback((): void => {
    // clear all letters
    clearLetterStates();
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
  }, [pickWordAndCategory]);

  // process the letter input
  const verifyLetter = (letter: string): void => {
    const normalizedLetter: string = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // check if guesses end
  useEffect(() => {
    if(guesses <= 0){
      // reset all states
      clearLetterStates()

      setGameStage(stages[2].name);
    }
  }, [guesses])

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // win condition
    if(
      letters.length > 0 &&
      guessedLetters.length === uniqueLetters.length
    ) {
      // add score
      setScore((actualScore) => actualScore + 100)

      // restart gamem with new word
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  // restarts the game
  const retry = (): void => {
    setScore(0);
    setGuesses(3);

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord}  
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <End retry={retry} score={score}/>}
    </div>
  )
}

export default App
