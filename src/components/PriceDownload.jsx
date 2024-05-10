
import {useState,useEffect } from 'react'

import DatePicker from "react-multi-date-picker"

import GreenButton from './primitives/GreenButton';
import GreenTextBox from './primitives/GreenTextBox';
import GreenCheckBox from './primitives/GreenCheckBox';

import {putPriceDownload, getIdentifierCodes } from '../utils/api';
import Loading from './stateless/Loading';

export default function PriceDownload(props){
    
    const {callbackFunc} = props

    const [isLoading, setIsLoading] = useState(false)
    const [downloadId, setDownloadId] = useState(null)
    const [error, setError] = useState(null)

    const [allTickers, setAllTickers] = useState([])
    const [ticker, setTicker] = useState("")
    const [dateFrom, setDateFrom] = useState(new Date(new Date().setMonth(new Date().getMonth()-1)))
    const [dateTo, setDateTo] = useState(new Date())

    useEffect(() =>{
        getIdentifierCodes()
        .then((data)=>{
            setAllTickers(data.codes)
        })
    }, [])

    const viewPrices = (event) =>{
        event.preventDefault()
        callbackFunc(downloadId)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (ticker && dateFrom && dateTo){
            if (allTickers.includes(ticker.toUpperCase())){
                if (dateFrom<dateTo){

                    const newDownload = {
                        "tickers":[ticker.toUpperCase()],
                        "date_from": dateFrom.toISOString().split('T')[0],
                        "date_to": dateTo.toISOString().split('T')[0]
                    }
                    setError(null)
                    setIsLoading(true)
                    setDownloadId(false)
                    putPriceDownload(newDownload)
                    .then((data) =>{
                        setIsLoading(false)
                        setDownloadId(data.download_id)
                    })
                    .catch((error) =>{
                        console.log(error)
                        setError(error.message)
                        setIsLoading(false)
                    })
                }
                else{
                    setError("From Date must be less than To Date")
                }
            }
            else {
                setError("Ticker not found in database")
            }
        }
        else {
            setError("Please fill out all fields")
            
        }
      }
      
    const handleTextbox = (event) =>{
        setTicker(event.target.value)
    }

    const inputConfig= {
        "label": "Indentifier",
        "labelLocation": "above",
        "id": 'ticker-input',
        "value": ticker,
        "onChange": handleTextbox,
    }

    const checkBoxConfig = {
        "title": "Source",
        "label": "Yahoo Finance",
        "id": "source-input",
        "disabled": true,
        "checked": true,
    }

    return (
        <>        
            <form onSubmit = {handleSubmit}>
                <fieldset>
                    <GreenTextBox fieldProps = {inputConfig}/>  
                    <div className='left-aligned-input'>
                        <label htmlFor='datefrom-input'> Date from:</label>
                        <DatePicker inputClass="custom-datepicker" className='custom-datepicker' value = {dateFrom} id ='datefrom-input' format="YYYY-MM-DD" onChange = {(newDate) =>{newDate? setDateFrom(newDate.toDate()): setDateFrom(null)}}/>
                    </div>
                    <div className='left-aligned-input'>
                        <label htmlFor='dateto-input'> Date to:</label>
                        <DatePicker inputClass="custom-datepicker"  value = {dateTo} id ='dateto-input' format="YYYY-MM-DD"
                        onChange = {(newDate) =>{newDate? setDateTo(newDate.toDate()): setDateTo(null)}}  />      
                    </div>
                </fieldset>
                <fieldset className='py-2 pe-2 text-end'>
                    <GreenCheckBox boxProps = {checkBoxConfig}/>
                </fieldset>

                <fieldset className='text-end pe-2'>
                    <GreenButton text = "Download" btntype = "submit" isDisabled = {isLoading}/>
                </fieldset>
                <fieldset className='text-start'>
                   {error && <p className='error-class'>{error}</p>}
                   {isLoading && <Loading />}
                   {downloadId && 
                   <div className= "top-split mt-3 pt-2 pe-2 d-flex justify-content-between">
                      <p className='mb-0 align-content-center'>Prices downloaded</p>
                      <GreenButton text = "View" clickFunction = {viewPrices}/>
                   </div>}
                </fieldset>                
            </form>
        </>
    )
}