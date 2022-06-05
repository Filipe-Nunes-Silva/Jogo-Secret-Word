//Import Css
import './App.css';
//Import React
import {useCallback,useEffect,useState} from 'react';
//Import Dados
import {wordsList} from './data/words';
//Import Componentes
import TelaInicial from './components/TelaInicial';
import Game from './components/Game';
import GameOver from './components/GameOver';

const estagios = [
  {id:1,nome:'start'},
  {id:2,nome:'game'},
  {id:3,nome:'end'},
];
const QtdChances = 3;

function App() {
  const [estagioGame,setEstagioGame] = useState(estagios[0].nome);
  const [words] = useState(wordsList);

  const [palavraEscolhida,setPalavraEscolhida] = useState('');
  const [categoriaEscolhida,setCategoriaEscolhida] = useState('');
  const [letras,setLetras] = useState([]);

  const [letrasEscolhidas,setLetrasEscolhidas] = useState([]);
  const [letrasErradas,setLetrasErradas] = useState([]);
  const [chances,setChances] = useState(QtdChances);
  const [pontuacao,setPontuacao] = useState(0);

  const escolhePalavraECategoria = ()=>{
    //Escolhendo a categoria
    const categorias = Object.keys(words);
    const categoria = categorias[Math.floor((Math.random() * categorias.length))];
    //Escolhendo a palavra
    const palavra = words[categoria][Math.floor((Math.random() * words[categoria].length))];
    return {palavra,categoria};
  };
  
  //Inicia o Game
  const startGame = ()=>{
    limpaTodosOsEstados();
    const {palavra,categoria} = escolhePalavraECategoria();
    let letrasPalavra = palavra.toLowerCase().split('');
    setPalavraEscolhida(palavra);
    setCategoriaEscolhida(categoria);
    setLetras(letrasPalavra);

    setEstagioGame(estagios[1].nome);
    //remover
    console.log(palavra);
  };

  //Verifica letra
  const verificaLetra = (letra)=>{
    const letraEmMinusculo = letra.toLowerCase();

    if(letrasEscolhidas.includes(letraEmMinusculo) || letrasErradas.includes(letraEmMinusculo)){
      return;
    }
    if(letras.includes(letraEmMinusculo)){
      setLetrasEscolhidas((valorAnterior)=> [...valorAnterior,letraEmMinusculo]);
    }
    else{
      setLetrasErradas((valorAnterior)=> [...valorAnterior,letraEmMinusculo]);
      setChances((valorAnterior)=>valorAnterior -1);
    };
  };

  //Limpa todos os estados
  const limpaTodosOsEstados = ()=>{
    setLetrasEscolhidas([]);
    setLetrasErradas([]);
  };

  //chega se terminou as tentativas
  useEffect(()=>{
    if(chances <= 0){
      limpaTodosOsEstados();
      setEstagioGame(estagios[2].nome);
    };
  },[chances]);
//chega se o usuario acertou
useEffect(()=>{
  const letrasUnicas = [... new Set(letras)];
  if(letrasUnicas.length === letrasEscolhidas.length && estagioGame === estagios[1].nome){

    //add pontuação
    setPontuacao((valorAnterior)=> valorAnterior += 100)

    setTimeout(()=>{
      //add nova palavra
      startGame();
    },1000);
  }
},[letrasEscolhidas]);

//remover
  // console.log(palavraEscolhida);
  // console.log(letrasEscolhidas);
  // console.log(letrasErradas);
  // console.log(chances);

  //Reinicia Game
  const reiniciaGame = ()=>{
    setPontuacao(0);
    setChances(QtdChances);
    setEstagioGame(estagios[0].nome);
  };
 

  return (
    <div className='App'>
      {estagioGame === 'start' && <TelaInicial startGame={startGame}/>}

      {estagioGame === 'game' && 
      <Game 
      verificaLetra={verificaLetra} 
      palavraEscolhida={palavraEscolhida} 
      categoriaEscolhida={categoriaEscolhida} 
      letras={letras} 
      letrasEscolhidas={letrasEscolhidas}
      letrasErradas={letrasErradas}
      chances={chances}
      pontuacao={pontuacao}
      />}

      {estagioGame === 'end' && <GameOver reiniciaGame={reiniciaGame} pontuacao={pontuacao}/>}
      
    </div>
  );
};

export default App;
