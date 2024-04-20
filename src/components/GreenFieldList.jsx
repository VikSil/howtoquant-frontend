import {useState} from 'react'

export default function GreenFieldList(props){

    const {fieldDict, initFieldState=true}= props

    const [fieldState, setFieldState] = useState(initFieldState)

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <>
            <div className='container'>
                        {Object.entries(fieldDict).map(([key,value])=>{
                            return (
                                <div className='row py-2' key = {key}>
                                    <div className='col text-end'>
                                        <label htmlFor={`${key.toLowerCase().replace(' ','-')}-input`} className='me-2'> {(key[0].toUpperCase()+key.substring(1)).replace("_", " ")}:</label>                                        
                                    </div>
                                    <div className='col text-start'>
                                        <input id = {`${key.toLowerCase().replace(' ','-')}-input`} className='me-2' type = "text" defaultValue = {value} readOnly ={fieldState} />
                                    </div>
                                </div>
                            )
                        })}                    
            </div>
        </>
    )
}