import {useState } from 'react'

import NavSection from './NavSection'

import '../assets/css/NavPane.css'

export default function NavPane(){
    
    /* THIS WILL BE RETURNED FROM BACKEND CONFIG APP, DEPENDING ON USER PERMISSIONS  */
    const [categories, setCategories] = useState([{"organisation": ["funds & books","strategies", "broker accounts"]}, 
    {"instruments": ["equities"]},
    {"market data":["identifiers", "prices", "fx rates", "interest rates","analytics"]}, 
    {"accounting": ["trades list", "PnL ladder","trade screen"]},
    {"sources":[]}])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    let content  = (
        <>
            {categories.map((item, index) =>{
                return (<NavSection key = {index} section = {item} />)
            })}
        </>

    )


    if(isLoading) { content = <p>Main page loading</p> }      
  
    if (error !== null) { content = <p> {error.response.status} </p>   }

    return (
        <aside className="d-flex flex-column align-items-stretch green-bckgr p-1" >
            {content}
         </aside>
    )
}