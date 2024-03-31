import '../assets/css/GreenButton.css'

export default function GreenButton(props){
    const {clickFunction, text} = props

return (
        
            <button className = "green-bckgr" type = "button" onClick = {clickFunction}>
                <div className = "px-2 py-1">
                    {text}
                </div>
            </button>
        
)
}