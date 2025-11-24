import './End.css';

type RetryProps = {
  retry: () => void;
}

const End = ({retry}: RetryProps) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Resetar jogo</button>
    </div>
  )
}

export default End