import styles from '../assets/css/TelaInicial.module.css';


const TelaInicial = ({startGame}) => {
  return (
    <div className={styles.start}>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar o jogo</button>

    </div>
  );
};

export default TelaInicial;