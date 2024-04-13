
import {useState } from 'react'

import DatePicker from "react-multi-date-picker"

import GreenButton from './GreenButton';

import { getPriceDownload } from '../utils/api';
import Loading from './Loading';

export default function PriceDownload(props){
    
    const {callback} = props

    const [isLoading, setIsLoading] = useState(false)
    const [downloaded , setDownloaded] = useState(false)
    const [error, setError] = useState(null)

    const [ticker, setTicker] = useState("")
    const [dateFrom, setDateFrom] = useState(new Date(new Date().setMonth(new Date().getMonth()-1)))
    const [dateTo, setDateTo] = useState(new Date())

    const viewPrices = (event) =>{
        event.preventDefault()
        callback("view")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (ticker && dateFrom && dateTo){
            const newDownload = {
                "tickers":[ticker],
                "date_from": dateFrom.toISOString().split('T')[0],
                "date_to": dateTo.toISOString().split('T')[0]
            }
            setError(null)
            setIsLoading(true)
            setDownloaded(false)
            getPriceDownload(newDownload)
            .then((data) =>{
                console.log(data)
                setIsLoading(false)
                setDownloaded(true)
            })
            .catch((error) =>{
                console.log(error)
                setError(error.message)
                setIsLoading(false)
            })
        }
        else {
            setError("Please fill out all fields")
        }
      }


    return (
        <>        
            <form onSubmit = {handleSubmit}>
                <fieldset>
                    <div className='left-aligned-input'>
                        <label htmlFor='identifier-input'> Indentifiers:</label>
                        <input id = 'identifier-input' type = "text" value = {ticker} onChange = {(event) => {setTicker(event.target.value)}}/>
                    </div>
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
                    <legend className='mb-0'>
                        <strong >
                            Source:
                        </strong>
                    </legend>
                        {/* Checkbox styling is controlled by OS, will have to eventually replace by Material UI component */}
                    <input type="checkbox" disabled= {true} checked = {true}/><label className='ps-2'> Yahoo Finance</label>
                </fieldset>

                <fieldset className='text-end pe-2'>
                    <GreenButton text = "Download" btntype = "submit" isDisabled = {isLoading}/>
                </fieldset>
                <fieldset className='text-start'>
                   {error && <p className='error-class'>{error}</p>}
                   {isLoading && <Loading />}
                   {downloaded && 
                   <div className= "top-split mt-3 pt-2 pe-2 d-flex justify-content-between">
                      <p className='mb-0 align-content-center'>Prices downloaded</p>
                      <GreenButton text = "View" clickFunction = {viewPrices}/>
                   </div>}
                </fieldset>                
            </form>
        </>
    )
}