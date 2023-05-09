import './Button.css'
function Button({title="Sing In / Login",isDescription,isSearch}){ 
    return(
        <button className={"button " + (isDescription && "description" )}>{title}</button>
    )
}
export default Button