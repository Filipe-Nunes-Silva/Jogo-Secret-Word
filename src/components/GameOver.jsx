import styles from '../assets/css/GameOver.module.css';

const GameOver = ({reiniciaGame,pontuacao}) => {
  return (
    <div>
       <h1>Fim de Jogo!</h1>
       <h2>A sua pontuação foi: <span>{pontuacao}</span></h2>
        <button onClick={reiniciaGame}>Resetar Jogo</button>
    </div>
  );
};

export default GameOver;