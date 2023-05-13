import React from "react";
import Jogo from "./Jogo.js"
import Letras from "./Letras.js"
import palavras from './palavras';

export default function App() {

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    const [palavra, setPalavra] = React.useState("");
    const [erros, setErros] = React.useState(0);
    const [letrasClicadas, setLetrasClicadas] = React.useState(alfabeto);
    const [palavraDoDiaArray, setPalavradDoDiaArray] = React.useState([]);
    const [palavraArrayTracos, setPalavraArrayTracos] = React.useState([]);
    const [acabouOJogo, setAcabouOJogo] = React.useState("word-color-black");


    function escolherPalavra() {
        setLetrasClicadas([]);
        setErros(0);
        setAcabouOJogo("word-color-black");
        const palavraDoDia = palavras[Math.floor(Math.random() * palavras.length)];
        console.log('palavra do dia aqui:', palavraDoDia);

        const palavraArrayComTracos = Array(palavraDoDia.length).fill('_');
        setPalavra(palavraDoDia);
        setPalavraArrayTracos(palavraArrayComTracos);
        setPalavradDoDiaArray(palavraDoDia.split(''));
    }


    function chutarLetra(letraDoItem) {
        const letraAdcsNoArray = [...letrasClicadas];
        letraAdcsNoArray.push(letraDoItem);
        setLetrasClicadas(letraAdcsNoArray);

        if (palavraDoDiaArray.includes(letraDoItem)) {
            const palavraArraySemTracos = [...palavraArrayTracos];
            for (let i = 0; i < palavraDoDiaArray.length; i++) {
                if (palavraDoDiaArray[i] === letraDoItem) {
                    palavraArraySemTracos[i] = letraDoItem.toLocaleLowerCase();
                }
            }
            setPalavraArrayTracos(palavraArraySemTracos);

            if (!palavraArraySemTracos.includes('_')) {
                setAcabouOJogo("word-color-green");
                setLetrasClicadas(alfabeto);
            }

        }
        else {
            const total = erros + 1;
            setErros(total);

            if (total === 6) {
                setLetrasClicadas(alfabeto);
                setPalavraArrayTracos(palavraDoDiaArray);
                setAcabouOJogo("word-color-red");
            }
        }
    }

    return (
        <div className="App">
            <Jogo
                erros={erros}
                palavraArrayTracos={palavraArrayTracos}
                corPalavra={acabouOJogo}
                escolherPalavra={escolherPalavra}
            />

            <div className="keyboard-center">
                <div className="keyboard-container">
                    {alfabeto.map((letraItem, index) =>
                        <Letras
                            key={index}
                            classename={!letrasClicadas.includes(letraItem) ? "letter-unclicked" : "letter-clicked"}
                            letra={letraItem}
                            clicked={!letrasClicadas.includes(letraItem) ? chutarLetra : ''}
                            disabled={!letrasClicadas.includes(letraItem) ? false : true}
                        />
                    )
                    }
                </div>
            </div>
        </div>
    )
}