import {useEffect, useState } from 'react'

import Loading from './Loading';
import Error from './Error';

import GreenTable from './GreenTable';

export default function TablePage(props){  

    const {title, fetchFunction, fetchParams, fetchKey, signalLoading, signalError} = props

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const [items, setItems] = useState([{}])

    useEffect(()=>{
        setError(null)
        if (signalError){
            signalError(false)
        }
        setIsLoading(true)
        if (signalLoading) {
            signalLoading(true)
        }
        fetchFunction(fetchParams)

        .then((data) => {
            setItems(data[fetchKey]);
        })
        .catch((error)=>{
            setError(error);
            if (signalError){
                signalError(true)
            }
        })
        .finally(()=>{
            setIsLoading(false);
            if (signalLoading) {
                signalLoading(false)
            }
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