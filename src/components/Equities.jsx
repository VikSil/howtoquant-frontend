import {useEffect, useState } from 'react'

import {getAllEquities} from '../utils/api';

import Loading from './Loading';
import Error from './Error';

import GreenTable from './GreenTable';

export default function Equities(){  

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    const [equities, setEquities] = useState([{}])

    useEffect(()=>{
        getAllEquities()
        .then((data) => {
            setEquities(data.equities);
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
            <h2>All Equities</h2>
            <GreenTable headers = {Object.keys(equities[0])} data = {equities}/>
        </>         
    )

    if(isLoading) { content = <Loading /> }      
  
    if (error !== null) {
        content = <Error errorCode = {error.response.status} />
    }


    return (
        <main className = "d-flex flex-column flex-fill p-5">
            {content}
        </main>
    )

}