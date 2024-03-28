import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/userContext.jsx';
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <UserProvider>
        <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
