import {useEffect, useState } from 'react'

import Loading from './Loading';
import Error from './Error';

import GreenTable from './GreenTable';

export default function TablePage(props){  

    const {title, fetchFunction, fetchParams, fetchKey, onceDone} = props

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    const [items, setItems] = useState([{}])

    useEffect(()=>{
        setError(null)
        setIsLoading(true)
        fetchFunction(fetchParams)
        .then((data) => {
            console.log(data)
            setItems(data[fetchKey]);
        })
        .catch((error)=>{
            setError(error);
        })
        .finally(()=>{
            setIsLoading(false);
            onceDone(false)
        })
        
    }, [title, fetchParams])



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
        <main className = "d-flex flex-column flex-fill">
            {content}
        </main>
    )

}