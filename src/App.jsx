import './assets/css/App.css'

import {Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react'


import TitleBar from './components/TitleBar'
import NavPane from './components/NavPane'
import MainArea from './components/MainArea'


function App() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    /* THIS WILL BE RETURNED FROM BACKEND CONFIG APP, DEPENDING ON USER PERMISSIONS  */
    const [categories, setCategories] = useState([{"organisation": ["funds & books","strategies", "broker accounts"]}, 
    {"instruments": ["equities"]},
    {"market data":["identifiers", "prices", "fx rates", "interest rates","analytics"]}, 
    {"accounting": ["trades list", "PnL ladder","trade screen"]},
    {"sources":[]}])

    const [routes, setRoutes] = useState([])

    function getAllRoutes (categories) {
      let sections = []
      for (let i = 0; i<categories.length; i++){
        let section = Object.keys(categories[i])[0]
        if (categories[i][section].length>0) {
          sections.push(...categories[i][section])
        }
        else {sections.push(Object.keys(categories[i])[0])}
      }
      return sections
    }

   

  const detectSreenWidth = () =>{
    setScreenWidth(window.innerWidth)
  }

  useEffect(() =>{
    setRoutes(getAllRoutes(categories))   
    window.addEventListener('resize', detectSreenWidth)
 
    return() =>{
      window.removeEventListener('resize', detectSreenWidth)
    }

  }, [screenWidth])

  let content = (
    <>
    <TitleBar />
    <section className = "d-flex max-height">
      <NavPane categories = {categories}/>
      <Routes> 
        {/* TO BE REPLACED WITH SECTION SPECIFIC PAGES */}
        <Route path = "/" element = {<MainArea source = {"root"}/>} />
        {routes.includes("funds & books")&& <Route path = "/funds & books" element = {<MainArea source= {"funds & books"}/>} />}
        {routes.includes("strategies")&& <Route path = "/strategies" element = {<MainArea source= {"strategies"}/>} />}
        {routes.includes("broker accounts")&& <Route path = "/broker accounts" element = {<MainArea source= {"broker accounts"}/>} />}
        {routes.includes("equities")&& <Route path = "/equities" element = {<MainArea source= {"equities"}/>} />}
        {routes.includes("identifiers")&& <Route path = "/identifiers" element = {<MainArea source= {"identifiers"}/>} />}
        {routes.includes("prices")&& <Route path = "/prices" element = {<MainArea source= {"prices"}/>} />}
        {routes.includes("fx rates")&& <Route path = "/fx rates" element = {<MainArea source= {"fx rates"}/>} />}
        {routes.includes("interest rates")&& <Route path = "/interest rates" element = {<MainArea source= {"interest rates"}/>} />}
        {routes.includes("analytics")&& <Route path = "/analytics" element = {<MainArea source= {"analytics"}/>} />}
        {routes.includes("trades list")&& <Route path = "/trades list" element = {<MainArea source= {"trades list"}/>} />}
        {routes.includes("PnL ladder")&& <Route path = "/PnL ladder" element = {<MainArea source= {"PnL ladder"}/>} />}
        {routes.includes("trade screen")&& <Route path = "/trade screen" element = {<MainArea source= {"trade screen"}/>} />}
        {routes.includes("sources")&& <Route path = "/sources" element = {<MainArea source= {"sources"}/>} />}
      </Routes>
    </section >
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
