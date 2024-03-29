import {useEffect, useState } from 'react'

import { getIdentifierTypes } from '../utils/api';


export default function MainArea(){  
    
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
        <main className = "d-flex flex-column">
            <p>This is going to be the Main Area of the website</p>
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