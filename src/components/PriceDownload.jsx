
import {useState } from 'react'

import DatePicker from "react-multi-date-picker"

import GreenButton from './GreenButton';

export default function PriceDownload(){  

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("this registers");
      }


    return (
        <>        
            <form onSubmit = {handleSubmit}>
                <fieldset>
                    <div className='left-aligned-input'>
                        <label htmlFor='identifier-input'> Indentifiers:</label>
                        <input id = 'identifier-input' type = "text"/>
                    </div>
                    <div className='left-aligned-input'>
                        <label htmlFor='datefrom-input'> Date from:</label>
                        <DatePicker inputClass="custom-datepicker" className='custom-datepicker' id ='datefrom-input' format="YYYY-MM-DD"/>
                    </div>
                    <div className='left-aligned-input'>
                        <label htmlFor='dateto-input'> Date to:</label>
                        <DatePicker inputClass="custom-datepicker"  id ='dateto-input' format="YYYY-MM-DD"/>      
                    </div>
                </fieldset>
                <fieldset className='py-2 pe-2 text-end'>
                    <legend className='mb-0'>
                        <strong >
                            Download options:
                        </strong>
                    </legend>
                    <options>
                        {/* Checkbox styling is controlled by OS, will have to eventually replace by Material UI component */}
                    <input type="checkbox" disabled= "true" checked = "true"/><label className='ps-2'> Yahoo Finance</label>
                </options>
                </fieldset>
                <fieldset className='text-end pe-2'>
                    <GreenButton text = "Download" btntype = "submit"/>
                </fieldset>
            </form>
        </>
    )
}