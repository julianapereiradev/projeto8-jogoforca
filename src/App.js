import Jogo from './Jogo';
import Letras from './Letras';
import palavras from './palavras';


function App() {

  palavras.sort(comparador);

  function comparador() {
    return Math.random() - 0.5;
  }

  return (
    <div className='App'>
      {console.log('mostrando palavras dentro do App:', palavras)}
      <Jogo />
      <div className='keyboard-center'>
        <Letras />
      </div>
    </div>
  );
}

export default App;
