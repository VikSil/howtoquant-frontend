import {SpinnerInfinity} from 'spinners-react'

export default function Loading(){
    return (
        <main className="mx-5 mt-4 ">
            <p className="text-center mb-4">Loading, please wait...</p>     
            <SpinnerInfinity size={60} thickness={100} speed={100} color="#556b2f" secondaryColor="rgba(85,107,47,0.3)" />
        </main>        
    )
}