import React, { useContext, useEffect, useState } from 'react'
import "./styles/module.css"
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { check } from './http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '.'
import { Spinner } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
// import { setIsAuth } from '../store/index'
import { ISAUTH_USERS } from './store/userReducer'



const App = observer(() => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.isAuthReducer.isAuth)
  console.log(isAuth)

  const setAuth = (isAuth) => {
    dispatch({ type: ISAUTH_USERS, payload: isAuth })
  }


  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      // user.setIsAuth(true)
      setAuth(true)
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
})

export default App


