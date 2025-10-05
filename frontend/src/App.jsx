import { useState, useEffect } from 'react'
import {Routes,Route} from "react-router-dom";
import { customAxios } from './lib/axios.js'
import RoutesConfig from './routes/RoutesConfig.jsx'

function App() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    customAxios.get("/welcome").then(res => setMsg(res.data));
  }, [])

  return (
    <RoutesConfig />
  )
}

export default App
