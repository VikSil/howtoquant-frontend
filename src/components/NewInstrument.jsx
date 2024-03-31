import {useState } from 'react'

import GreenButton from './GreenButton';

export default function NewInstrument(){  

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const [subpage, setSubPage] = useState(null);

    const setManual = ()=> {
        setSubPage("manual")
    }

    const setDownload = () => {
        setSubPage("download")
    }

    let content = (
        <>
            <h2>Add new instrument</h2>
            <div className='d-flex justify-content-center'>
                <GreenButton text = {"Manually"} clickFunction= {setManual}/>
                <GreenButton text = {"Download"} clickFunction= {setDownload}/>
            </div>
            {subpage === "manual"?
                <p>This will be manual page</p>
            : subpage=== "download" ?
                <p>This will be download page</p>      
              : null  
        }
            
        </>         
    )

    return (
        <main className = "d-flex flex-column flex-fill pt-5 px-3">
            {content}
        </main>
    )

}