import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import logo from '../assets/img/logo.png'

import '../assets/css/TitleBar.css'

export default function TitleBar(){
    
    const  {user}  = useContext(UserContext);

    return (
        <header className = "green-header py-2">
            <div className = "decorative-strips py-1">
                <div className=' green-header  d-flex py-2 px-2 justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                    {/* LOGO TO BE IMPROVED */}
                    <img className='logo p-2' src = {logo} alt = "logo"></img> 
                    <p className='title px-2'>How to Quant?</p>
                    </div>
                    <div>
                        <p>User: {user.username}</p>
                        <p>Org: {user.organisation}</p>
                    </div>
                </div>
            </div>
         </header>
    )
}