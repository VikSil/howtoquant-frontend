import {useState} from 'react'

export default function GreenCheckBox(props){

    const {boxProps}= props

    /*
    fieldProps = {
        "title" : "str - title above the checkbox",
        "label" : "str - label to the right of the checkbox",
        "id" : "str - id of the textbox",
        "disabled" : "bool - weather the checkbox is read only or not - optional, defaults to false",
        "checked" : "bool - weather the checkbox is checked or not - optional, defaults to false",
        "onChange" : "callback function - optional",
    }    
    */

    const [fieldState, setFieldState] = useState(boxProps.readOnly)


    return (
        <>
            <legend className='mb-0'>
                <strong >
                    {boxProps.title}:
                </strong>
            </legend>
                {/* Checkbox styling is controlled by OS, will have to eventually replace by Material UI component */}
            <input type="checkbox" disabled= {boxProps.disabled} checked = {boxProps.checked}/><label className='ps-2'>{boxProps.label}</label>
        </>)
}