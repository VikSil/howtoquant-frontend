import '../assets/css/GreenButton.css'

export default function GreenButton(props){
    const {clickFunction, text, isDisabled, id} = props

return (
        
            <button className = "green-bckgr ms-1 mb-1" type = "button" onClick = {clickFunction} disabled = {isDisabled}>
                <div className = "px-2 py-1"  id = {id}>
                    {text}
                </div>
            </button>
        
)
}