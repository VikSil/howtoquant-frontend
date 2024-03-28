import { useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function TitleBar(){
    
    const  {user}  = useContext(UserContext);

    return (
        <header  >
            <p>This is going to be the TitleBar</p>
            <p>The user is: {user.username}</p>
            <p>The organisation is: {user.organisation}</p>
         </header>
    )
}