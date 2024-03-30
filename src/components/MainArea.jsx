import {useEffect, useState } from 'react'

import { getIdentifierTypes } from '../utils/api';

import '../assets/css/MainArea.css'


export default function MainArea(props){  
    
    const {source} = props

    const [identifierTypes, setidentifierTypes] = useState([{"type_name":"ISIN"}, {"type_name":"SEDOL"},{"type_name":"Ticker"},  ]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);


    // useEffect(()=>{
    //     getIdentifierTypes()
    //     .then((data) => {
    //         setidentifierTypes(data.identifier_types);
    //     })
    //     .catch((error)=>{
    //         setError(error);
    //     })
    //     .finally(()=>{
    //         setIsLoading(false);
    //     })
        
    // }, [])


    let content = (
        <main className = "d-flex flex-column flex-fill pt-5 px-3">
            <p>This is going to be the Main Area of the website</p>
            <p>Source: {source}</p>
            {identifierTypes.map((item, index) =>{
                return (<p key = {index}>{item.type_name}</p>)
            })}
         </main>
    )

    if(isLoading) { content = <p>Main page loading</p> }      
  
    if (error !== null) { content = <p> {error.response.status} </p>   }

    return (
        <>
            {content}
        </>
    )

}