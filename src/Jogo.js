import forca0 from './assets/forca0.png'

export default function Jogo() {

function chooseWord() {
    alert('Cliquei')
}

    return (
        <div className="board-container">
            <div className="board-left">
                <img src={forca0} alt="forca0" />
            </div>
            <div className='board-right'>
                <button className='button-sort-word' onClick={chooseWord}>
                    Escolher Palavra
                </button>
                <div className='letter-container display-none'>
                    <p className='letter-underline'></p>
                    <p className='letter-underline'></p>
                    <p className='letter-underline'></p>
                    <p className='letter-underline'></p>
                    <p className='letter-underline'></p>
                    <p className='letter-underline'></p>
                    <p className='letter-underline'></p>
                    <p className='letter-underline'></p>
                </div>
            </div>
        </div>

    )
}