import {useState} from 'react'
import GreenTextBox from './primitives/GreenTextBox'

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

                            const fieldConfig= {
                                "label": key,
                                "labelLocation": "left-apart",
                                "id": key,
                                "defaultValue": value,
                                "readOnly": true,
                            }

                            return (
                                <GreenTextBox fieldProps = {fieldConfig} key = {key}/>
                            )
                        })}                    
            </div>
        </>
    )
}