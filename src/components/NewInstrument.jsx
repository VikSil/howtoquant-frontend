import {useState } from 'react'
import {useSearchParams} from 'react-router-dom'

import GreenButton from './GreenButton';

export default function NewInstrument(props){  

    const [searchParams, setSearchParams] = useSearchParams();
    const [subpage, setSubPage] = useState(searchParams.get("subpage"));

    const setManual = ()=> {
        setSubPage("manual")
    }

    const setDownload = () => {
        setSubPage("download")
    }

    let content = (
        <>
            <h2>New Instrument</h2>
            <div className='d-flex justify-content-center spaced-div'>
                <GreenButton text = {"Input Form"} clickFunction= {setManual}/>
                <GreenButton text = {"Download"} clickFunction= {setDownload}/>
            </div>
            <section className = "d-flex justify-content-center top-split mt-4 py-5">
            {subpage === "manual"?
                <p>Under construction</p>
            : subpage=== "download" ?
                <p>This will be download page</p>      
              : null  
        }
        </section>   
        </>         
    )

    return (
        <main className = "d-flex flex-column flex-fill p-5">
            {content}
        </main>
    )

}