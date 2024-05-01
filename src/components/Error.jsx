export default function Error(props){
    const {errorCode} = props


    return (
        <>
        <main className="mx-5 mt-4 ">
            {errorCode === 400 && <p className="text-center mb-4">Bad request</p> }
            {errorCode === 401 && <p className="text-center mb-4">Unauthorised</p> }
            {errorCode === 402 && <p className="text-center mb-4">Forbidden</p> }
            {errorCode === 404 && <p className="text-center mb-4">404 - Page not found</p> }
            {errorCode === 408 && <p className="text-center mb-4">Request Timeout</p> }
            {errorCode === 429 && <p className="text-center mb-4">Too Many requests</p> }
            {errorCode === 500 && <p className="text-center mb-4">Server Error</p> }    
            {errorCode === 503 && <p className="text-center mb-4">Service Unavailable</p> }             
        </main>      
        </>
    )
}