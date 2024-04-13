import {useEffect, useState } from 'react'

import GreenButton from './GreenButton';
import PriceDownload from './PriceDownload';

export default function NewInstrument(){  

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const [subpage, setSubPage] = useState(null);


    useEffect(() =>{
    
      }, [subpage])

    const setView = ()=> {
        setSubPage("view")
    }

    const setDownload = () => {
        setSubPage("download")
    }

    let content = (
        <>
            <h2>Market Prices</h2>
            <div className='d-flex justify-content-center spaced-div'>
                <GreenButton text = {"View Prices"} clickFunction= {setView}/>
                <GreenButton text = {"Download"} clickFunction= {setDownload}/>
            </div>
            <section className = "d-flex justify-content-center top-split mt-4 py-5">
                {subpage === "view"?
                    <p>This will be manual page</p>
                : subpage=== "download" ?
                    <PriceDownload callback = {setSubPage}/>      
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