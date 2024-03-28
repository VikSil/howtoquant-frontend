import {useEffect, useState } from 'react'

import { getIdentifierTypes } from '../utils/api';


export default function MainArea(){  
    
    const [identifierTypes, setidentifierTypes] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);


    useEffect(()=>{
        getIdentifierTypes()
        .then((data) => {
            setidentifierTypes(data.identifier_types);
        })
        .catch((error)=>{
            setError(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
    }, [])


    let content = (
        <>
            <p>This is going to be the Main Area of the website</p>
            {identifierTypes.map((item, index) =>{
                return (<p key = {index}>{item.type_name}</p>)
            })}
         </>
    )

    if(isLoading) { content = <p>Main page loading</p> }      
  
    if (error !== null) { content = <p> {error.response.status} </p>   }

    return (
        <>
            {content}
        </>
    )

}