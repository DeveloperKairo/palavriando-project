import './StartScreen.css'

type StartScreenProps = {
  startGame: () => void;
}

const StartScreen = ({startGame}: StartScreenProps) => {
  return (
    <div className="start">
      <h1>Palavriando</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={startGame}>Começar jogo</button>
    </div>
  )
}

export default StartScreen