import {useState} from 'react'

export default function GreenTextBox(props){

    const {fieldProps}= props

    /*
    fieldProps = {
        "label" : "str - label text",
        "labelLocation" : "str - possible values: left, left-apart, above",
        "id" : "str - id of the textbox",
        "readOnly" : "bool - weather the textbox is read only or not - optional, defaults to false",
        "defaultValue" : "str - default value of the text box - optional",
        "value" : "str - current value of the textbox - optional",
        "length" : "int - length of the text box - optional, defaults to 20",
        "onChange" : "callback function - optional"
    }
    
    */

    const [fieldState, setFieldState] = useState(fieldProps.readOnly)


    return (
        <>
        {fieldProps.labelLocation === "left-apart"?
            <div className='row py-2'>
                <div className='col text-end'>
                    <label htmlFor={`${fieldProps.id.toLowerCase().replace(' ','-')}-input`} className='me-2'> {(fieldProps.label[0].toUpperCase()+fieldProps.label.substring(1)).replace("_", " ")}:</label>                                        
                </div>
                <div className='col text-start'>
                    <input id = {`${fieldProps.id.toLowerCase().replace(' ','-')}-input`} className='me-2' type = "text" defaultValue = {fieldProps.defaultValue} value = {fieldProps.value} readOnly ={fieldState}  onChange = {fieldProps.onChange}/>
                </div>
            </div>
        : fieldProps.labelLocation === "left"?
            <>
                <label htmlFor={`${fieldProps.id.toLowerCase().replace(' ','-')}-input`} className='me-2'> {(fieldProps.label[0].toUpperCase()+fieldProps.label.substring(1)).replace("_", " ")}:</label> 
                <input id = {`${fieldProps.id.toLowerCase().replace(' ','-')}-input`} className='me-2' type = "text" defaultValue = {fieldProps.defaultValue} value = {fieldProps.value} readOnly ={fieldState}  onChange = {fieldProps.onChange}/>
            </>
        : fieldProps.labelLocation === "above"?
            <div className='left-aligned-input'>
                <label htmlFor={`${fieldProps.id.toLowerCase().replace(' ','-')}-input`}> {(fieldProps.label[0].toUpperCase()+fieldProps.label.substring(1)).replace("_", " ")}:</label>
                <input id = {`${fieldProps.id.toLowerCase().replace(' ','-')}-input`}  type = "text" value ={fieldProps.value} onChange = {fieldProps.onChange}/>
            </div>
        : null 
        }
    </>)
}