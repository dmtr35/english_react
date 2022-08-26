import React, { useContext, useEffect, useState, useRef } from "react"
import { getCollections, deleteCollection, deleteManyCollection } from "../http/collectionApi"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import '../styles/module.css'
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { handleChange, isCheckTrue } from "../utils/dopFunction"
import CreateCollection from "../modals/CreateCollection"
import EditCollection from "../modals/EditCollection"
import AddWords from "../modals/AddWords"
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'


const Collections = observer(() => {
    const { fullCollections } = useContext(Context)
    const [addCollectionsVisible, setAddCollectionsVisible] = useState(false)
    const [editCollectionsVisible, setEditCollectionsVisible] = useState(false)
    const [addWordsVisible, setAddWordsVisible] = useState(false)
    const userId = localStorage.getItem('userId')
    const arrCheck = localStorage.getItem(`arrCheck-${userId}`)
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
        if (!arrCheck || arrCheck === '[]') {
            setDisabledDeleteChecked(true)
        } else setDisabledDeleteChecked(false)
    }, [arrCheck])

    useEffect(() => {
        getCollections(`${localStorage.getItem('userId')}`)
            .then(data => collections(data))
            .then(data => fullCollections.setIsLoadColleltions(false))
    }, [fullCollections.checked, fullCollections.isLoadColleltions])

    const collections = (data) => {
        fullCollections.setCollections(data)
    }

    const deleteColl = (id) => {
        deleteCollection(id)
            .then(data => fullCollections.setIsLoadColleltions(true))
    }
    const deleteManyColl = () => {
        deleteManyCollection(JSON.parse(localStorage.getItem(`arrCheck-${userId}`)))
            .then(data => fullCollections.setIsLoadColleltions(true))
            .then(data => localStorage.removeItem(`arrCheck-${userId}`))
    }

    const addMenuColl = (id) => {
        if (fullCollections.menuColl.includes(id)) {
            fullCollections.setMenuColl('')
        } else {
            fullCollections.setMenuWord('')
            fullCollections.setMenuColl([id])
        }
    }

    return (
        <div className="collection-list">
            <div className="d-grid gap-2 mt-2 mb-2 m-3">
                <Button className="button"
                    onClick={() => { setAddCollectionsVisible(true) }}
                    variant="primary"
                    size="lg"
                >Добавить колекцию </Button>
                <CreateCollection show={addCollectionsVisible} onHide={() => setAddCollectionsVisible(false)} />
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
                                {!fullCollections.menuColl.includes(collection._id) ?
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
                                    <div className="parentMenu">
                                        <div
                                            className="menu4IconCollParent"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <AiOutlinePlusSquare
                                                className="iconMenuColl"
                                                onClick={() => setAddWordsVisible(true)}
                                            />
                                            <AiOutlineEdit
                                                className="iconMenuColl"
                                                onClick={() => setEditCollectionsVisible(true)}
                                            />
                                            <AiOutlineDelete
                                                className="iconMenuColl"
                                                onClick={() => deleteColl(collection._id)}
                                            />
                                            <AiOutlineMenu
                                                className="iconMenuColl"
                                                onClick={() => addMenuColl(collection._id)}
                                            />
                                            <EditCollection
                                                idColl={collection._id}
                                                show={editCollectionsVisible}
                                                onHide={() => setEditCollectionsVisible(false)}
                                                collName={collection.name}
                                            />
                                            <AddWords
                                                idColl={collection._id}
                                                show={addWordsVisible}
                                                onHide={() => setAddWordsVisible(false)}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        </Card>
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