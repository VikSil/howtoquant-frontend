import {useState } from 'react'
import {useSearchParams} from 'react-router-dom'

import GreenButton from '../primitives/GreenButton';
import InstrumentDownload from './subpages/InstrumentDownload';

export default function NewInstrument(props){  

    const [searchParams, setSearchParams] = useSearchParams();
    const [subpage, setSubPage] = useState(searchParams.get("subpage"));


    return (
        <main className = "d-flex flex-column flex-fill p-5">
            <h2>New Instrument</h2>
            <div className='d-flex justify-content-center spaced-div'>
                <GreenButton text = {"Input Form"} clickFunction= {()=> {setSubPage("manual")}}/>
                <GreenButton text = {"Download"} clickFunction= {()=> {setSubPage("download")}}/>
            </div>
            <section className = "d-flex justify-content-center top-split mt-4 py-5">
                {subpage === "manual"?
                    <p>Under construction...</p>
                : subpage=== "download" ?
                    <InstrumentDownload/>     
                : null  
                }
            </section>   
        </main>
    )
}