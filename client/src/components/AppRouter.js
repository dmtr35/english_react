import React, { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Context } from ".."
import { authRouters, pablicRouters } from "../routes"
import { LOGIN_ROUTE } from "../utils/consts"

import { useDispatch, useSelector } from 'react-redux'
// import { setIsAuth } from '../store/index'
import { ISAUTH_USERS } from '../store/userReducer'



const AppRouter = () => {
    const dispatch = useDispatch()
      const isAuth = useSelector(state => state.isAuthReducer.isAuth)
      console.log(isAuth)
    
      const setAuth = (isAuth) => {
        dispatch({ type: ISAUTH_USERS, payload: isAuth })
      }
    const { user } = useContext(Context)
    
    return (
        <Routes>
            {/* {user.isAuth && authRouters.map(({ path, Element }) => */}
            {isAuth && authRouters.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} />
            )}
            {pablicRouters.map(({ path, Element }) => 
            <Route key={path} path={path} element={<Element />} />
            )}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    )
}



export default AppRouter