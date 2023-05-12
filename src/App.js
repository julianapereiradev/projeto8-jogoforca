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


function comparador() {
    return Math.random() - 0.5;
}

export default function App() {

    const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    // const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    
    const palavra = palavras[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '').split('')
    console.log("PALAVRA AQUI:", palavra)

    const [errors, setErrors] = useState(0);

    const [display, setDisplay] = useState("display-none")

    const [letraClicada, setLetraClicada] = useState(letras)
    console.log('letraClicada ANTES:', letraClicada)


    const imgs = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]

    let novasLetrasDescobertas = []

    console.log('novasLetrasDescobertas ANTES:', novasLetrasDescobertas)
    const [letrasDescobertas, setLetrasDescobertas] = useState(novasLetrasDescobertas)
    console.log('letrasDescobertas ATENS:', letrasDescobertas)

    const [win, setWin] = useState(false)

    const [lose, setLose] = useState(false)

    const [disabled, setDisabled] = useState(true)

    const palavraAjeitada = arrayAjeitado(palavras[0].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').split(''))
    console.log('PALAVRA AJEITADA AQUI:', palavraAjeitada)



    function Letras({ letras }) {
        console.log('LETRAAAAAAAAS AQUI:', letras)
        return (
            <div className="keyboard-container">
                {letras.map((l, index) => {
                    return <button
                        key={index}
                        data-test="letter"
                        value={l}
                        disabled={disabled}
                        onClick={cliqueiNaLetra}
                        className={letraClicada.includes(l) ? "letter disabled" : "letter enabled"}
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
        setLetraClicada([]);
        setLetrasDescobertas([])
        setWin(false)
        setLose(false)
        setDisabled(false)
        palavras.sort(comparador)
    }

    function arrayAjeitado(array) {
        console.log('parametro array de treat array:', array)
        return array.filter((i,
            index) => array.indexOf(i) === index);
    }

    function cliqueiNaLetra(e) {
        let letraEscolhida = e.target.value
        console.log('letraEscolhida:', letraEscolhida)
        console.log('letraClicada::', letraClicada)


            if (palavra.includes(letraEscolhida.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toLowerCase())) {

                novasLetrasDescobertas = [...letrasDescobertas, letraEscolhida.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')]
                console.log('novasLetrasDescobertas DEPOIS', novasLetrasDescobertas)
                setLetrasDescobertas(novasLetrasDescobertas)

                console.log('novasLetrasDescobertas.lengt', novasLetrasDescobertas.length)
                console.log('palavraAjeitada', palavraAjeitada.length)


                if (novasLetrasDescobertas.length === palavraAjeitada.length) {
                    setWin(true)
                    setDisabled(true)
                }
            }
            else {
                setErrors(errors + 1)
                if (errors + 1 === 6) {
                    setLose(true)
                    setDisabled(true)
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
                        {palavra.map((letterinarray, index) => (
                            <p
                                className={"spaces " + (win ? "win" : "") + (lose ? "lose" : "")}
                                data-test="word"
                                key={index}
                                >{letrasDescobertas.includes(letterinarray.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toUpperCase()) || win || lose ? letterinarray : "_"}</p>
                        ))}
                    </div>
                </div>

            </div>

            <div className="keyboard-center">
                <Letras letras={letras} />
            </div>

        </div>

    )
}