import { useState,useRef,useEffect } from 'react';
import styles from '../assets/css/Game.module.css';
import '../assets/css/Game.css';


const Game = ({verificaLetra,palavraEscolhida,categoriaEscolhida,letras,letrasEscolhidas,letrasErradas,chances,pontuacao}) => {
  const [letra,setLetra] = useState('');
  const letraInputReferencia = useRef(null);


  const handleSubmit = (evento)=>{
    evento.preventDefault();
    verificaLetra(letra);
    setLetra('');
    letraInputReferencia.current.focus();
  };

  //Muda a classe do span quando acerta a palavra, e a cor da letra fica verde
  const [classePalavra,setClassePalavra] = useState('letter');
  useEffect(()=>{
    setClassePalavra('letter1');
    setTimeout(()=>{
      setClassePalavra('letter');
    },1000);
  },[pontuacao]);


  return (
    <div className={styles.game}>
        <p className={styles.points}>
          <span>Pontuação: {pontuacao}</span>
        </p>
        <h1>Adivinhe a Palavra:</h1>
        <h3 className={styles.tip}>
          Dica sobre a palavra: <span>{categoriaEscolhida}</span>
        </h3>
        <p>Você ainda tem {chances} tentativa(s).</p>
        <div className={styles.wordContainer}>
          {letras.map((item,indice)=>(
            letrasEscolhidas.includes(item) ? 
            ( <span key={indice} className={classePalavra}>{item}</span>) : (<span key={indice} className={styles.blankSquare}></span>)
          ))}
        </div>
        <div className={styles.letterContainer}>
          <p>Tente adivinhar uma letra da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="letter" 
              maxLength="1" 
              required 
              onChange={(evento)=>setLetra(evento.target.value)}
              value={letra}
              ref={letraInputReferencia}
            />
            <button>Jogar!</button>
          </form>
        </div>
        <div className={styles.wrongLettersContainer}>
          <p>Letras já ultilizadas:</p>
          {letrasErradas.map((item,indice)=>(
            <span key={indice}>{item}, </span>
          ))}
        </div>
    </div>
  );
};

export default Game;