import React, { useContext, useEffect, useState, useRef } from "react"
import { getCollections, deleteManyCollection } from "../http/collectionApi"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { handleChange, isCheckTrue } from "../utils/dopFunction"
import CreateCollectionModal from "../modals/CreateCollectionModal"
import { AiOutlineMenu } from 'react-icons/ai'
import MenuCollection from '../components/CollectionMenu/MenuCollection'
import ModalDivDeleteColl from '../modals/ModalDivDeleteColl'
// import { useDispatch, useSelector } from 'react-redux'
// import { setIsAuth } from '../store/index'
// import { ISAUTH_USERS } from '../store/userReducer'



const Collections = observer(() => {
    // const dispatch = useDispatch()
    // const isAuth = useSelector(state => state.isAuthReducer.isAuth)
    // console.log(isAuth)
    
    // const setAuth = (isAuth) => {
    //     dispatch({type: ISAUTH_USERS, payload: isAuth})
    // }

    const { fullCollections } = useContext(Context)
    const [addCollectionsVisible, setAddCollectionsVisible] = useState(false)
    const userId = localStorage.getItem('userId')
    const arrCheck = JSON.parse(localStorage.getItem(`arrCheck-${userId}`))
    const [show, setShow] = useState(false)
    const [disabledDeleteChecked, setDisabledDeleteChecked] = useState(false)

    const hideCollections = useRef('none')


    const onButtonClick = () => {
        if (!show) {
            hideCollections.current.style.display = "none"
            setShow(true)
        } else {
            hideCollections.current.style.display = "block"
            setShow(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('delayWordDelete') === null) {
            localStorage.setItem('delayWordDelete', true)
        }
    }, [])
    useEffect(() => {
        if (!arrCheck || arrCheck.length === 0) {
            setDisabledDeleteChecked(true)
        } else setDisabledDeleteChecked(false)
    }, [arrCheck])

    useEffect(() => {
        getCollections(userId)
            .then(data => collections(data))
        fullCollections.setIsLoadColleltions(false)
    }, [fullCollections.checked, fullCollections.isLoadColleltions])

    const collections = (data) => {
        fullCollections.setCollections(data)
    }

    const deleteManyColl = () => {
        deleteManyCollection(arrCheck)
            .then(data => fullCollections.setIsLoadColleltions(true))
            .then(data => localStorage.removeItem(`arrCheck-${userId}`))
    }

    const addMenuColl = (id) => {
        if (fullCollections.menuColl.includes(id)) {
            fullCollections.setMenuColl('')
            fullCollections.setMenuWord('')
        } else {
            fullCollections.setMenuWord('')
            fullCollections.setMenuColl(id)
        }
    }


    return (
        <div className="collection-list">
            <div className="d-grid gap-2 mt-2 mb-2 m-3">
                <Button className="button"
                    onClick={() => { setAddCollectionsVisible(true) }}
                    variant="primary"
                    size="lg"
                >Добавить колекцию
                </Button>
                <CreateCollectionModal show={addCollectionsVisible} onHide={() => setAddCollectionsVisible(false)} />
            </div>
            <div className="d-grid gap-2 mt-2 mb-2 m-3">
                <Button className="button"
                    variant="primary"
                    size="lg"
                    onClick={onButtonClick}
                >
                    {show ? 'Показать коллекции' : 'Скрыть коллекции'}
                </Button>
            </div>
            <div
                ref={hideCollections}
            >
                {fullCollections.collections.map(collection =>
                    <div
                        key={collection._id}
                        className="m-1">
                        <Card
                        >
                            <div className="cardCollBasic">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        style={{ cursor: 'pointer' }}
                                        type="checkbox"
                                        value="checked"
                                        onClick={() => fullCollections.setChecked(!fullCollections.checked)}
                                        defaultChecked={isCheckTrue(collection._id)}
                                        onChange={() => handleChange(collection._id)}
                                    />
                                </div>
                                <div className="textFormColl">
                                    {collection.name}
                                </div>
                                {!fullCollections.menuColl.includes(collection._id)
                                    ?
                                    <div className="parentMenu">
                                        <div
                                            className="menu"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <AiOutlineMenu
                                                className="iconMenuColl"
                                                onClick={() => addMenuColl(collection._id)}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <MenuCollection
                                            collId={collection._id}
                                            collName={collection.name}
                                            addMenuColl={addMenuColl}
                                        />
                                    </>
                                }
                            </div>
                        </Card>
                        <ModalDivDeleteColl
                            collId={collection._id}
                            cancelDeleteColl={fullCollections.cancelDeleteColl}
                        />
                    </div>
                )
                }
                <div className="d-grid gap-2 mt-2 mb-2 m-3">
                    <Button
                        className="button"
                        disabled={disabledDeleteChecked}
                        onClick={() => deleteManyColl()}
                        variant="primary"
                        size="lg"
                    >
                        Удалить отмеченные
                    </Button>
                </div>
            </div>
        </div >


    )
})



export default Collections



