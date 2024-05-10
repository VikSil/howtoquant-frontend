import {useState} from 'react'

export default function GreenRadioButtons(props){

    const {boxProps}= props

    /*
    boxProps = {
        "name" : "str - name common for all radio buttons in a group",
        "buttons" : "list - dictionaries with props of individual buttons", {
            "id" : "str - id of the radio button",
            "value" : "str - the value of radio button group associated with the button",
            "checked" : "bool - if the button is selected - optional, defaults to false",
            "label" : "str - the text that appears to the right of the radio button - optional, defaults to '' "
            "onChange" : "callback function - optional",
            
        }
    }    
    */

    const [fieldState, setFieldState] = useState(boxProps.readOnly)


    return (
        <>
            {boxProps.buttons.map((button) => {
                return (
                    <>
                        <input type="radio" name= {boxProps.name} id = {`${button.id}-radio`} value = {button.value} checked = {button.checked} onChange={button.onChange}/><label htmlFor = {`${button.id}-radio`} className='py-1 ps-1'>{button.label}</label>
                        <br></br>
                    </>
                )
            })
            }
        </>)
}