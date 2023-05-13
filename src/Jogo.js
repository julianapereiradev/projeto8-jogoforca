import React from 'react'

export default function Jogo(props) {

	return (
		<>
			<div className='board-container'>
				<div className='board-left'>
					<img
						src={`./assets/forca${props.erros}.png`}
						data-test="game-image"
						alt="jogo imag"
					/>
				</div>

				<div className='board-right'>
					<button
						className='button-sort-word'
						onClick={props.escolherPalavra}
						data-test="choose-word">
						Escolher Palavra
					</button>

					<div
						className={props.corPalavra}
						data-test="word"
					>
						{props.palavraArrayTracos}
					</div>
				</div>
			</div>
		</>
	)
}