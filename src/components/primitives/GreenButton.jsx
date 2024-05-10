import '../../assets/css/GreenButton.css'

export default function GreenButton(props){
    const {clickFunction, text, isDisabled, id, btntype} = props

return (
        
            <button className = "green-bckgr ms-1 mb-1" type = {btntype || "button"} onClick = {clickFunction} disabled = {isDisabled}>
                <div className = "px-2 py-1"  id = {id}>
                    {text}
                </div>
            </button>
        
)
}