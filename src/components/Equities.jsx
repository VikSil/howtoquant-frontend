import {useEffect, useState } from 'react'
import { Link ,useSearchParams} from "react-router-dom"

import GreenButton from './primitives/GreenButton';
import TableContainer from './containers/TableContainer';
import ViewFieldList from './ViewFieldList';

import {getAllEquities} from '../utils/api';

export default function Equities(){  

    const [searchParams] = useSearchParams();
    const [subpage, setSubPage] = useState(searchParams.get("subpage"));

    useEffect(() =>{
    
      }, [subpage])

    const viewEquities = ()=> {
        setSubPage("viewEquities")
    }

    const viewTicker = () => {
        setSubPage("viewTicker")
    }
   
    let content = (
        <>
            <h2>Equities</h2>
            <div className='d-flex justify-content-center spaced-div'>
                <GreenButton text = {"View All"} clickFunction= {viewEquities}/>
                <GreenButton text = {"View Ticker"} clickFunction= {viewTicker}/>
                <Link className = 'px0' to={`/new instrument?subpage=download`}>
                    <GreenButton text = {"Download"}/>
                </Link>
                
            </div>
            <section className = "d-flex justify-content-center top-split mt-4 py-5">
                {subpage === "viewEquities"?
                    <TableContainer title = {"All Equities"} fetchFunction = {getAllEquities} fetchKey = {"equities"}/>
                : subpage=== "viewTicker" ?
                    <ViewFieldList labelText = {"Ticker"} itemTitle = {"Instrument details"} initDownloadId={searchParams.get("downloadId")}/>
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