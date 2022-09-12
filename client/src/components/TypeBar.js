import React, { useContext } from "react"
import { Navbar } from "react-bootstrap"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, SETTINGS, LEARN_WORDS } from "../utils/consts"
import { FaBook } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
// import { setIsAuth } from '../store/index'
import { ISAUTH_USERS } from '../store/userReducer'




const TypeBar = observer(() => {
    const dispatch = useDispatch()
      const isAuth = useSelector(state => state.isAuthReducer.isAuth)
      console.log(isAuth)
    
      const setAuth = (isAuth) => {
        dispatch({ type: ISAUTH_USERS, payload: isAuth })
      }



    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        // user.setIsAuth(false)
        setAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="primary" expand="lg" >
            <Container fluid >
                <div className="logo">
                    <FaBook size={28} className='icon_book_logo' />
                    <Navbar.Brand
                        style={{ color: 'white', cursor: 'pointer' }}
                        onClick={() => navigate(LEARN_WORDS)}
                    >
                        English easy
                    </Navbar.Brand>
                </div>

                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>

                </Navbar.Collapse>
                <>
                    <AiFillSetting
                        className='settings_logo'
                        onClick={() => navigate(SETTINGS)}
                    />
                    <Button
                        onClick={() => logOut()}
                        variant="secondary"
                        style={{ background: '#0946A1', border: 'none' }}
                        className="m-1">
                        Log out
                    </Button>
                </>
            </Container>
        </Navbar>
    )
})





export default TypeBar