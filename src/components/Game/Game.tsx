import './Game.css';

type VerifyLetterProps = {
  verifyLetter: () => void;
}

const Game = ({verifyLetter}: VerifyLetterProps) => {
  return (
    <div>
      <h1>Game</h1>
      <button onClick={verifyLetter}>Finalizar jogo</button>
    </div>
  )
}

export default Game