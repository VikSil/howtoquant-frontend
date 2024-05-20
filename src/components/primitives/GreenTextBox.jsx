import {useState} from 'react'

export default function GreenTextBox(props){

    const {text, labelLocation, id, readOnly, defaultValue, value = '', length, onChange}= props

    /*
    PROPS

    "text" : str - label text,
    "labelLocation" : str - possible values: left, left-apart, above,
    "id" : str - id of the textbox,
    "readOnly" : bool - whether the textbox is read only or not - optional, defaults to false,
    "defaultValue" : str - default value of the text box - optional,
    "value" : str - current value of the textbox - optional,
    "length" : int - length of the text box - optional, defaults to 20,
    "onChange" : callback function - optional

    */

    const [fieldState, setFieldState] = useState(readOnly)

    return (
        <>
        
        {labelLocation === "left-apart"?
            <div className='row py-2'>
                <div className='col text-end'>
                    <label htmlFor={`${id.toLowerCase().replace(' ','-')}-input`} className='me-2'> {(text[0].toUpperCase()+text.substring(1)).replace("_", " ")}:</label>                                        
                </div>
                <div className='col text-start'>
                    <input id = {`${id.toLowerCase().replace(' ','-')}-input`} className='me-2' type = "text" defaultValue = {defaultValue} value = {value} readOnly ={fieldState}  onChange = {onChange}/>
                </div>
            </div>
        : labelLocation === "left"?
            <>
                <label htmlFor={`${id.toLowerCase().replace(' ','-')}-input`} className='me-2'> {(text[0].toUpperCase()+text.substring(1)).replace("_", " ")}:</label> 
                <input id = {`${id.toLowerCase().replace(' ','-')}-input`} className='me-2' type = "text" defaultValue = {defaultValue} value = {value} readOnly ={fieldState}  onChange = {onChange}/>
            </>
        : labelLocation === "above"?
            <div className='left-aligned-input'>
                <label htmlFor={`${id.toLowerCase().replace(' ','-')}-input`}> {(text[0].toUpperCase()+text.substring(1)).replace("_", " ")}:</label>
                <input id = {`${id.toLowerCase().replace(' ','-')}-input`}  type = "text" value ={value} onChange = {onChange}/>
            </div>
        : null 
        }
    </>)
}