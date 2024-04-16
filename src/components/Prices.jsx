import {useEffect, useState } from 'react'

import GreenButton from './GreenButton';
import PriceDownload from './PriceDownload';
import ReviewDownload from './ReviewDownload';

export default function NewInstrument(){  

    const [subpage, setSubPage] = useState(null);
    const [downloadId, setDownloadId] = useState(undefined)
    const [showDownload, setShowDownload] = useState(false)

    useEffect(() =>{
    
      }, [subpage])

    const viewPrices = ()=> {
        setSubPage("viewPrices")
    }

    const newDownload = () => {
        setSubPage("newDownload")
    }
    const viewDownload = () => {
        setSubPage("viewDownload")
    }

    const returnPrices = (newDownloadId) =>{
        setDownloadId(newDownloadId)
        setShowDownload(true)
        setSubPage("viewDownload")
    }

    let content = (
        <>
            <h2>Market Prices</h2>
            <div className='d-flex justify-content-center spaced-div'>
                <GreenButton text = {"View Prices"} clickFunction= {viewPrices}/>
                <GreenButton text = {"New Download"} clickFunction= {newDownload}/>
                <GreenButton text = {"View Download"} clickFunction= {viewDownload}/>
            </div>
            <section className = "d-flex justify-content-center top-split mt-4 py-5">
                {subpage === "viewPrices"?
                    <p>This will be manual page</p>
                : subpage=== "newDownload" ?
                    <PriceDownload callbackFunc ={returnPrices} />   
                : subpage=== "viewDownload" ?
                    <ReviewDownload initDownloadId = {downloadId} initIsLoading= {showDownload}/>
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