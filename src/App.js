// import Jogo from './Jogo';
// import Letras from './Letras';
// import palavras from './palavras';


// export default function App() {

//   palavras.sort(comparador);

//   function comparador() {
//     return Math.random() - 0.5;
//   }

//   const word = palavras[0]
//   console.log('word já vindo diferente aqui:', word)

//   return (
//     <div className='App'>
//       {word}
//       <Jogo />
//       <div className='keyboard-center'>
//         <Letras />
//       </div>
//     </div>
//   );
// }

import palavras from "./palavras"
import { useState } from "react"
import forca0 from "./assets/forca0.png"
import forca1 from "./assets/forca1.png"
import forca2 from "./assets/forca2.png"
import forca3 from "./assets/forca3.png"
import forca4 from "./assets/forca4.png"
import forca5 from "./assets/forca5.png"
import forca6 from "./assets/forca6.png"

palavras.sort(comparador);

function comparador() {
    return Math.random() - 0.5;
}


export default function App() {

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    const [errors, setErrors] = useState(0);
    const [display, setDisplay] = useState("display-none")
    const [lettersclicked, setLettersClicked] = useState(letters)
    console.log('lettersclicked:', lettersclicked)
    const word = palavras[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '').split('')
    console.log("WORD AQUI:", word)

    const imgs = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
    let newLettersDiscovered = []
    console.log('newLettersDiscovered ANTES:', newLettersDiscovered)
    const [lettersdiscovered, setLettersDiscovered] = useState(newLettersDiscovered)
    console.log('lettersdiscovered ATENS:', lettersdiscovered)
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const treatedWord = treatArray(palavras[0].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').split(''))


    function Letter({ letters }) {
        console.log('letters aqui:', letters)
        return (
            <div className="keyboard-container">
                {letters.map((l, index) => {
                    return <button
                        key={index}
                        data-test="letter"
                        value={l}
                        disabled={disabled}
                        onClick={chooseLetter}
                        className={lettersclicked.includes(l) ? "letter disabled" : "letter enabled"}
                        >
                        {l}
                    </button>;
                })}
            </div>
        )
    }

    function startGame() {
        setErrors(0)
        setDisplay("spaces")
        setLettersClicked([]);
        setLettersDiscovered([])
        setWin(false)
        setLose(false)
        setDisabled(false)
        palavras.sort(comparador)
    }

    function treatArray(array) {
        // console.log('parametro array de treat array:', array)
        return array.filter((i,
            index) => array.indexOf(i) === index);
    }
    // console.log('final treatArray(array):', treatArray(['a', 'm', 'a', 'r']))


    function chooseLetter(e) {
        let letterpicked = e.target.value
        console.log('letterpicked:', letterpicked)
        console.log('lettersCLicked::', lettersclicked)

        if (!lettersclicked.includes(letterpicked)) {
            setLettersClicked([...lettersclicked, letterpicked])

            if (word.includes(letterpicked.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toLowerCase())) {
                newLettersDiscovered = [...lettersdiscovered, letterpicked.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')]
                console.log('newLettersDiscovered DEPOIS', newLettersDiscovered)
                setLettersDiscovered(newLettersDiscovered)

                console.log('newLettersDiscovered.lengt', newLettersDiscovered.length)
                console.log('treatedWord', treatedWord.length)
                if (newLettersDiscovered.length === treatedWord.length) {
                    setWin(true)
                    setDisabled(true)
                    setLettersClicked(letters)
                }
            }
            else {
                setErrors(errors + 1)
                if (errors + 1 === 6) {
                    setLose(true)
                    setDisabled(true)
                    setLettersClicked(letters)
                }
            }
        }
    }

    return (
        <div className="App">

            <div className="board-container">

                <div className="board-left">
                    <img data-test="game-image" src={lose ? imgs[6] : imgs[errors]} alt="" />
                </div>

                <div className="board-right">
                    <button data-test="choose-word" className="button-sort-word" onClick={startGame}>Escolher palavra</button>
                    <div className={display}>
                        {word.map((letterinarray, index) => (
                            <p
                                className={"spaces " + (win ? "win" : "") + (lose ? "lose" : "")}
                                data-test="word"
                                key={index}
                            >{lettersdiscovered.includes(letterinarray.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toUpperCase()) || win || lose ? letterinarray : "_"}</p>
                        ))}
                    </div>
                </div>

            </div>

            <div className="keyboard-center">
                <Letter letters={letters} />
            </div>

        </div>

    )
}