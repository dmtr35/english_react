import React, { useState, useEffect } from 'react'
import "./styles/module.css"
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setIsAuthPayload } from './store/userReducer'



const App = () => {
  const dispatch = useDispatch()
  const setIsAuth = (value) => { dispatch(setIsAuthPayload(value)) }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }


  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App


