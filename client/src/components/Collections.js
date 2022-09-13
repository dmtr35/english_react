import React, { useEffect, useState, useRef } from "react"
import { getCollections, deleteManyCollection } from "../http/collectionApi"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { handleChange, isCheckTrue } from "../utils/dopFunction"
import CreateCollectionModal from "../modals/CreateCollectionModal"
import { AiOutlineMenu } from 'react-icons/ai'
import MenuCollection from '../components/CollectionMenu/MenuCollection'
import ModalDivDeleteColl from '../modals/ModalDivDeleteColl'

import { useDispatch, useSelector } from 'react-redux'
import { setIsLoadCollectionsPayload, setCheckedPayload, setMenuCollPayload, setMenuWordPayload, setCollectionsPayload} from '../store/collectionsReducer'


const Collections = () => {
    const dispatch = useDispatch()
    const isLoadCollections = useSelector(state => state.collectionsReducer.isLoadCollections)
    const checked = useSelector(state => state.collectionsReducer.checked)
    const menuColl = useSelector(state => state.collectionsReducer.menuColl)
    const cancelDeleteColl = useSelector(state => state.collectionsReducer.cancelDeleteColl)
    const collections = useSelector(state => state.collectionsReducer.collections)
    const setIsLoadColleltions = (value) => { dispatch(setIsLoadCollectionsPayload(value)) }
    const setChecked = (value) => { dispatch(setCheckedPayload(value)) }
    const setMenuColl = (value) => { dispatch(setMenuCollPayload(value)) }
    const setMenuWord = (value) => { dispatch(setMenuWordPayload(value)) }
    const setCollections = (value) => { dispatch(setCollectionsPayload(value)) }

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
            localStorage.setItem(`arrCheck-${userId}`, JSON.stringify([]))
            setDisabledDeleteChecked(true)
        } else setDisabledDeleteChecked(false)
    }, [arrCheck])

    useEffect(() => {
        getCollections(userId)
            .then(data => setCollections(data))
        setIsLoadColleltions(false)
    }, [checked, isLoadCollections])

    const deleteManyColl = () => {
        deleteManyCollection(arrCheck)
            .then(() => setIsLoadColleltions(true))
            .then(() => localStorage.removeItem(`arrCheck-${userId}`))
            .then(() => localStorage.setItem(`arrCheck-${userId}`, JSON.stringify([])))
    }

    const addMenuColl = (id) => {
        if (menuColl.includes(id)) {
            setMenuColl('')
            setMenuWord('')
        } else {
            setMenuWord('')
            setMenuColl(id)
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
                {collections.map(collection =>
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
                                        onClick={() => setChecked(!checked)}
                                        defaultChecked={isCheckTrue(collection._id)}
                                        onChange={() => handleChange(collection._id)}
                                    />
                                </div>
                                <div className="textFormColl">
                                    {collection.name}
                                </div>
                                {!menuColl.includes(collection._id)
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
                            cancelDeleteColl={cancelDeleteColl}
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
}



export default Collections



