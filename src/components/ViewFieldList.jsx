import {useEffect, useState } from 'react'

import FieldListPage from './FieldListPage';
import GreenButton from './GreenButton';

import {getInstrumentByTicker} from '../utils/api'

export default function ViewFieldList(props){

    const {itemTitle, initDownloadId, labelText,initIsLoading= false} = props

    const [textbox, setTextbox] = useState('')
    const [downloadId, setDownloadId] = useState(initDownloadId)
    const [isLoading, setIsLoading] = useState(initIsLoading)
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

    return(
        <>
            <div className='d-flex flex-column'>
                <div>
                    <form onSubmit = {handleSubmit}>        
                        <fieldset className='pb-5 text-center'>

                            <label htmlFor='textbox-input' className='me-2'>{labelText}:</label>
                            <input id = 'textbox-input' className='me-2' type = "text" value = {textbox} onChange = {handleTextbox}/>
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
