
import {useEffect, useState } from 'react'

import { getIdentifierTypes } from '../utils/api';

import '../assets/css/MainArea.css'

import Loading from './Loading';
import Error from './Error';


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
        <>
            <p>This is going to be the Main Area of the website</p>
            <p>Source: {source}</p>
            {identifierTypes.map((item, index) =>{
                return (<p key = {index}>{item.type_name}</p>)
            })}
        </>         
    )

    if(isLoading) { content = <Loading /> }      
  
    if (error !== null) {
        content = <Error errorCode = {error.response.status} />
    }

    return (
        <main className = "d-flex flex-column flex-fill pt-5 px-3">
            {content}
        </main>
    )

}