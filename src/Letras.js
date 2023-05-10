export default function Letras() {

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <div className="keyboard-container">
            {alfabeto.map((letra) =>
                <button className="button-key">
                    <p>{letra.toUpperCase()}</p>
                </button>
            )}
        </div>
    )
}