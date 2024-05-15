import '../../assets/css/GreenButton.css'

export default function GreenButton(props){
    const {clickFunction, text, isDisabled, id, btntype} = props


    /*
    PROPS

    "text": str - label on the button - optional, defaults to '',
    "id": str - id of the button,
    "btntype": str - type of the button, optional, defaults to "button",
    "isDisabled": bool - whether the button is diabled or not - optional, defaults to false,
    "clickFunction": callback function - optional
    
    */

return (
        
            <button className = "green-bckgr ms-1 mb-1" type = {btntype || "button"} onClick = {clickFunction} disabled = {isDisabled}>
                <div className = "px-2 py-1"  id = {id}>
                    {text}
                </div>
            </button>
        
)
}