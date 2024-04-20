import {useEffect, useState } from 'react'

import Loading from './Loading';
import Error from './Error';

import GreenFieldList from './GreenFieldList';

export default function FieldListPage(props){  

    const {title, fetchFunction, fetchParams, fetchKey, signalLoading, signalError} = props

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const [fieldDict, setFieldDict] = useState({})

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
            setFieldDict(data[fetchKey]);
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
            <h3>{title}</h3>            
            <GreenFieldList fieldDict = {fieldDict}/>
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