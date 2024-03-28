import './App.css'

import {Routes, Route} from 'react-router-dom';


import TitleBar from './components/TitleBar'
import NavPane from './components/NavPane'
import MainArea from './components/MainArea'

function App() {


  return (
    <>

    <TitleBar />
      <NavPane />
      <Routes>
        <Route path = "/" element = {<MainArea/>} />
      </Routes>

    </>
  )
}

export default App
