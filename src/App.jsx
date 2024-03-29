import './App.css'

import {Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react'


import TitleBar from './components/TitleBar'
import NavPane from './components/NavPane'
import MainArea from './components/MainArea'


function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const detectSreenWidth = () =>{
    setScreenWidth(window.innerWidth)
  }

  useEffect(() =>{
    window.addEventListener('resize', detectSreenWidth)

    return() =>{
      window.removeEventListener('resize', detectSreenWidth)
    }

  }, [screenWidth])

  let content = (
    <>
    <TitleBar />
    <NavPane />
    <Routes>
      <Route path = "/" element = {<MainArea/>} />
    </Routes>
    </>
  )

  // 576 is Bootstrap's small brekapoint
  if (screenWidth<=576){ 
    content = 
    <>
      <p>This website is not optimized for mobile viewing. Please use a device with a larger screen.</p>
    </>
   }
  

  return (
    <>
      {content}
    </>
  )
}

export default App
