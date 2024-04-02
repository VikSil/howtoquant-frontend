import {useEffect, useState } from 'react'

import Loading from './Loading';
import Error from './Error';

import GreenTable from './GreenTable';

export default function TablePage(props){  

    const {title, fetchFunction, fetchKey} = props

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    const [items, setItems] = useState([{}])

    useEffect(()=>{
        setIsLoading(true)
        fetchFunction()
        .then((data) => {
            setItems(data[fetchKey]);
        })
        .catch((error)=>{
            setError(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
        
    }, [title])



    let content = (
        <>
            <h2>{title}</h2>
            <GreenTable headers = {Object.keys(items[0])} data = {items}/>
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