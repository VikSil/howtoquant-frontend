import {useState,useEffect } from 'react'
import GreenButton from './GreenButton';
import TablePage from './TablePage'

import {getPriceDownload} from '../utils/api';

export default function ReviewDownload(props){

    const {initDownloadId, initIsLoading= false} = props

    const [textbox, setTextbox] = useState('')
    const [downloadId, setDownloadId] = useState(initDownloadId)

    const [isLoading, setIsLoading] = useState(initIsLoading)

    useEffect(() =>{
        initDownloadId ? setTextbox(initDownloadId): null
  
    }, [isLoading])


    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setDownloadId(textbox)
    }

    return (
        <>
            <div className='d-flex flex-column'>
                <div>
                    <form onSubmit = {handleSubmit}>        
                        <fieldset className='pb-5 text-center'>

                            <label htmlFor='downloadid-input' className='me-2'> Download Id:</label>
                            <input id = 'downloadid-input' className='me-2' type = "text" value = {textbox} onChange = {(event) => {setTextbox(event.target.value)}}/>
                            <GreenButton text = "View" btntype = "submit" isDisabled = {isLoading}/>
                        </fieldset>                
                    </form>
                </div>
                {downloadId && <TablePage title = {"Downloaded data"} fetchFunction = {getPriceDownload} fetchParams = {downloadId} fetchKey = {"prices"} 
                onceDone = {setIsLoading}/>}
            </div>

            
        </>
    )
}