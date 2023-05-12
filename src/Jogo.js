import React from 'react'

export default function Jogo(props){

	return(
		<>
			<div className='jogo'>
				<img src = {`./assets/forca${props.forcaImg}.png`} data-test="game-image" alt="jogo imag"/>
				<div className='lado-esquerdo'>
					<button className='escolher hover-anim' onClick={props.escolherPalavra} data-test="choose-word">Escolher Palavra</button>

					<div className={props.classe} data-test="word" data-answer={props.palavra}>{props.palavraEncripted}</div>
				</div>
			</div>
		</>
	)
}