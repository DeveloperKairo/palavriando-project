import './End.css';

type RetryProps = {
  retry: () => void;
  score: number;
}

const End = ({retry, score}:RetryProps) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default End