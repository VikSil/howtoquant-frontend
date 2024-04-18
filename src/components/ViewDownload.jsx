import {useState,useEffect } from 'react'
import GreenButton from './GreenButton';
import TablePage from './TablePage'

import {getPriceDownload, putSavePriceDownload} from '../utils/api';

export default function ViewDownload(props){

    const {initDownloadId, initIsLoading= false} = props

    const [textbox, setTextbox] = useState('')
    const [downloadId, setDownloadId] = useState(initDownloadId)
    const [isLoading, setIsLoading] = useState(initIsLoading)
    const [isLoadingError, setIsLoadingError] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [saveType, setSaveType] = useState('missing')
    const [saveResult, setSaveResult] = useState('')
    const [saveError, setSaveError] = useState('')

    useEffect(() =>{
        initDownloadId ? setTextbox(initDownloadId): null
  
    }, [isLoading])

    const handleDownloadRequest = (event) => {
        event.preventDefault()
        if (textbox.length > 0){
            setDownloadId(textbox)
        }
    }

    const handlePriceSave = (event) => {
        event.preventDefault()
        const saveDownload = {
            "download_id": parseInt(downloadId),
            "options": saveType
        }
        setIsSaving(true)
        setSaveResult('')
        setSaveError('')
        putSavePriceDownload(saveDownload)
        .then((data)=>{
            setSaveResult(data.result)
            setIsSaving(false)
        })
        .catch((error) =>{
            setSaveError(error.message)
            setIsSaving(false)
        })
    }

    const handleTextbox = (event) =>{
        setTextbox(event.target.value)
    }

    return (
        <>
            <div className='d-flex flex-column'>
                <div>
                    <form onSubmit = {handleDownloadRequest}>        
                        <fieldset className='pb-5 text-center'>

                            <label htmlFor='downloadid-input' className='me-2'> Download Id:</label>
                            <input id = 'downloadid-input' className='me-2' type = "text" value = {textbox} onChange = {handleTextbox}/>
                            <GreenButton text = "View" btntype = "submit" isDisabled = {isLoading}/>
                        </fieldset>                
                    </form>
                </div>
                {downloadId && <TablePage title = {"Downloaded data"} fetchFunction = {getPriceDownload} fetchParams = {downloadId} fetchKey = {"prices"} signalLoading = {setIsLoading} signalError={setIsLoadingError}/>}
                {!isLoading && !isLoadingError && downloadId && <div>
                    <form onSubmit = {handlePriceSave}> 
                        <fieldset className='pt-4 pb-2 text-end'>
                            <input type="radio" name= "save-type" id = "save-missing-radio" value = "missing" checked = {saveType==="missing"?true:false} onChange={(event)=>{setSaveType(event.target.value)}}/><label htmlFor = 'save-missing-radio' className='py-1 ps-1'> Save Missing Only</label>
                            <br></br>
                            <input type="radio" name= "save-type" id = "save-overrideall-radio" value = "overrideall" checked = {saveType==="overrideall"?true:false}  onChange={(event)=>{setSaveType(event.target.value)}}/><label htmlFor = 'save-overrideall-radio' className='py-1 ps-1'> Save All and Override </label>
                        </fieldset>
                        <fieldset className='text-end'>
                            <GreenButton text = "Save" btntype = "submit" isDisabled = {isSaving}/>
                            {saveResult && <p className='text-end pe-2 py-2'>{saveResult}</p>}
                            {saveError && <p className='error-class text-end pe-2 py-2'>{saveError}</p>}
                        </fieldset>                        
                    </form>
                </div>}
            </div>
        </>
    )
}