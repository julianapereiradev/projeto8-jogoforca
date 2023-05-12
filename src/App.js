import React from "react";
import Jogo from "./Jogo.js"
import Letras from "./Letras.js"
import palavras from './palavras';

export default function App() {

  const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

  const [forcaImg, setForcaImg] = React.useState(0);
  const [palavra, setPalavra] = React.useState("");
  const [palavraArray, setPalavraArray] = React.useState([]);
  const [palavraEncripted, setEncripted] = React.useState([]);
  const [letrasSelecionadas, setLetrasSel] = React.useState(alfabeto);
  console.log('no useState letrasSelecionadas é', letrasSelecionadas)
  const [winLoseState, setWinLose] = React.useState("palavra");

  function escolherPalavra() {
    setLetrasSel([]);
    setForcaImg(0);
    setWinLose("palavra");
    const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
    console.log('palavra secreta aqui:', palavraSecreta);

    const arrayCrypto = Array(palavraSecreta.length).fill('_');
    setPalavra(palavraSecreta);
    setEncripted(arrayCrypto);
    setPalavraArray(palavraSecreta.split(''));
  }

  function chutarLetra(lt) {
    console.log('quem é lt', lt)

    console.log('qm é letrasSelecionadas', letrasSelecionadas)
    const tempArray = [...letrasSelecionadas];
    console.log('tempArray antes do push:', tempArray)
    tempArray.push(lt);
    console.log('tempArray depois do push:', tempArray)
    setLetrasSel(tempArray);

    if (palavraArray.includes(lt)) {
      const newEncriptedArray = [...palavraEncripted];
      for (let i = 0; i < palavraArray.length; i++) {
        if (palavraArray[i] === lt) {
          newEncriptedArray[i] = lt.toLocaleLowerCase();
        }
      }
      setEncripted(newEncriptedArray);

      checkWinGame(newEncriptedArray);
    }
    else {
      const sum = forcaImg + 1;
      setForcaImg(sum);
      checkLoseGame(sum);
    }

  }

  function checkWinGame(arr) {
    if (!arr.includes('_') && arr !== []) {
      setWinLose("palavra green");
      setLetrasSel(alfabeto);
    }
  }

  function checkLoseGame(n) {
    if (n === 6) {

      setLetrasSel(alfabeto);
      setEncripted(palavraArray);
      setWinLose("palavra red");
    }
  }

  return (
    <>
      <Jogo
        forcaImg={forcaImg}
        palavraEncripted={palavraEncripted}
        classe={winLoseState}
        escolherPalavra={escolherPalavra}
        palavra={palavra}
      />
      <div className="bottom">
        <div className="letras-container">
          {alfabeto.map((element, index) =>
            <Letras
              key={index}
              classe={!letrasSelecionadas.includes(element) ? "letras" : "letras letra-clicada"}
              letra={element}
              clicked={!letrasSelecionadas.includes(element) ? chutarLetra : ''}
              disabled={!letrasSelecionadas.includes(element) ? false : true}
            />
          )
          }
        </div>
      </div>
    </>
  )
}