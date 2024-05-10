import {useEffect, useState } from 'react'

import FieldListPage from './FieldListPage';
import GreenButton from './primitives/GreenButton';
import GreenTextBox from './primitives/GreenTextBox';

import {getInstrumentByTicker} from '../utils/api'

export default function ViewFieldList(props){

    const {itemTitle, initDownloadId, labelText} = props

    const [textbox, setTextbox] = useState('')
    const [downloadId, setDownloadId] = useState(initDownloadId)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingError, setIsLoadingError] = useState(false)
 
    useEffect(() =>{
        initDownloadId ? setTextbox(initDownloadId): null
  
    }, [isLoading])


    const handleSubmit = (event) =>{
        event.preventDefault()
        if (textbox.length > 0){
            setDownloadId(textbox)
        }
    }

    const handleTextbox = (event) =>{
        setTextbox(event.target.value)
    }

    const fieldConfig= {
        "label": labelText,
        "labelLocation": "left",
        "id": 'ticker-input',
        "value": textbox,
        "onChange": handleTextbox,
    }

    return(
        <>
            <div className='d-flex flex-column'>
                <div>
                    <form onSubmit = {handleSubmit}>        
                        <fieldset className='pb-5 text-center'>
                            <GreenTextBox fieldProps = {fieldConfig}/>
                            <GreenButton text = "View" btntype = "submit" isDisabled = {isLoading}/>
                        </fieldset>                
                    </form>
                </div>
                {
                downloadId &&
                <FieldListPage title = {itemTitle} fetchFunction={getInstrumentByTicker} fetchParams={downloadId} fetchKey={'instrument_data'} signalLoading = {setIsLoading} signalError={setIsLoadingError}/>
                }
            </div>
        </>
    )
}
