
import {useState,useEffect } from 'react'
import { Link } from "react-router-dom"

import GreenButton from './GreenButton';

import {getIdentifierCodes,putInstrumentDownload } from '../utils/api';
import Loading from './Loading';

export default function InstrumentDownload(){
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [allTickers, setAllTickers] = useState([])
    const [ticker, setTicker] = useState("")
    const [isExistingTicker, setIsExistingTicker] = useState(false)
    const [instId, setInstId]=useState(null)

    useEffect(() =>{
        getIdentifierCodes()
        .then((data)=>{
            setAllTickers(data.codes)
        })
    }, [])

    const triggerDownload = (event)=>{
        setIsExistingTicker(false)
        const newDownload = {
            "ticker":ticker,
            "service":"polygon.io"
        }
        setError(null)
        setIsLoading(true)
        putInstrumentDownload(newDownload)
        .then((data) =>{
            setAllTickers(allTickers=>[...allTickers, ticker])
            data.status === "OK" ? setInstId(data.data.instrument_id):setError(data.data)
        })
        .catch((error) =>{
            console.log(error)
            setError(error.message)
        })
        .finally(() =>{
            setIsLoading(false)
        })    
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (ticker){
            
            if (allTickers.includes(ticker.toUpperCase())){
                setIsExistingTicker(true)
            }
            else {
                triggerDownload()
            }
        }
        else {
            setError("Please fill out ticker field")
           
        }
      }


    return (
        <>        
            <form onSubmit = {handleSubmit}>
                <fieldset >
                        <label htmlFor='identifier-input' className='pe-3'> Indentifier:</label>
                        <input id = 'identifier-input' type = "text" value = {ticker} onChange = {(event) => {setTicker(event.target.value)}}/>                 
                </fieldset>
                <fieldset className='py-2 pe-2 text-end'>
                    <legend className='mb-0'>
                        <strong >
                            Source:
                        </strong>
                    </legend>
                        {/* Checkbox styling is controlled by OS, will have to eventually replace by Material UI component */}
                    <input type="checkbox" disabled= {true} checked = {true}/><label className='ps-2'> polygon.io</label>
                </fieldset>

                <fieldset className='text-end pe-2'>
                    <GreenButton text = "Download" btntype = "submit" isDisabled = {isLoading}/>
                </fieldset>
                <fieldset className='text-start'>
                   {error && <p className='error-class'>{error}</p>}
                   {isLoading && <Loading />}
                   {isExistingTicker &&
                   <>
                   <div className= "top-split mt-3 pt-2 pe-2 d-flex justify-content-between">
                        <p className='mb-0 mt-3 align-content-center'>Ticker already exists in the database</p>
                   </div>
                    <div className= "pt-2 pe-2 d-flex justify-content-between">
                        <Link className = 'px0' to={`/equities?subpage=viewTicker&downloadId=${ticker}`}>
                            <GreenButton text = "View Existing" />
                        </Link>
                        <GreenButton text = "New Override" isDisabled = {isLoading} clickFunction={triggerDownload}/>
                    </div>
                    </>
                   }
                   {instId && 
                   <div className= "top-split mt-3 pt-2 pe-2 d-flex justify-content-between">
                        <p className='mb-0 align-content-center'>Instrument downloaded</p>
                        <Link className = 'px0' to={`/equities?subpage=viewTicker&downloadId=${ticker}`}>
                            <GreenButton text = "View"/>
                        </Link>
                   </div>}
                </fieldset>                
            </form>
        </>
    )
}