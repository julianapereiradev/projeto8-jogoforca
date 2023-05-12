export default function Letras(props){
    return(
        <button
        className={props.classe} 
        onClick={()=>props.clicked(props.letra)} 
        disabled={props.disabled} 
        data-test="letter">{props.letra.toLocaleUpperCase()}</button>
    )
}