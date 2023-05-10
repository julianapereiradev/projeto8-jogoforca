import Jogo from './Jogo';
import Letras from './Letras';
import palavras from './palavras';


function App() {
  return (
    <div className='App'>
      <Jogo />
      <div className='keyboard-center'>
        <Letras />
      </div>
    </div>
  );
}

export default App;
