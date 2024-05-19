export default function GreenRadioButtons(props){

    const {radioProps}= props

    /*
    radioProps = {
        "name" : str - name common for all radio buttons in a group,
        "onChange" : callback function - optional,
        "buttons" : list - dictionaries with props of individual buttons, [{
            "id" : str - id of the radio button,
            "value" : str - the value of radio button group associated with the button,
            "checked" : bool - if the button is selected - optional, defaults to false,
            "label" : str - the text that appears to the right of the radio button - optional, defaults to ''
            
        }]
    }    
    */

    return (
        <>
            {radioProps.buttons.map((button) => {
                return (
                    <>
                        <input type="radio" name= {radioProps.name} id = {`${button.id}-radio`} value = {button.value} checked = {button.checked} onChange={radioProps.onChange}/><label htmlFor = {`${button.id}-radio`} className='py-1 ps-1'>{button.label}</label>
                        <br></br>
                    </>
                )
            })
            }
        </>)
}