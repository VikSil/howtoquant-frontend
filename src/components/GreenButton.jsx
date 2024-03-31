import '../assets/css/GreenButton.css'

export default function GreenButton(props){
    const {clickFunction, text} = props

return (
        
            <button className = "green-bckgr mx-3 mb-3" type = "button" onClick = {clickFunction}>
                <div className = "px-2 py-1">
                    {text}
                </div>
            </button>
        
)
}