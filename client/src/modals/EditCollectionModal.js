import React, { useContext, useState } from 'react'
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { Form } from 'react-bootstrap'
import { editCollection } from '../http/collectionApi'
import { runInAction } from "mobx"

import { useDispatch, useSelector } from 'react-redux'
import { setMenuCollPayload } from '../store/collectionsReducer'

const EditCollectionModal = ({ collId, show, onHide, collName }) => {
    const dispatch = useDispatch()
    const setMenuColl = (value) => { dispatch(setMenuCollPayload(value)) }
    const collections = useSelector(state => state.collectionsReducer.collections)


    const [name, setName] = useState(`${collName}`)


    const editColl = () => {
        if (!name) return (onHide(), setMenuColl(''))
        editCollection(collId, name)
        onHide()
        setMenuColl('')
        runInAction(() => {
            const index = collections.findIndex(el => el._id === collId)
            collections[index].name = name
        })
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить название колекции
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='word'
                        placeholder="Введите название колекции"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={editColl}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default EditCollectionModal



