import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../index"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { observer } from 'mobx-react-lite'
import { Form } from 'react-bootstrap'
import { editCollection } from '../http/collectionApi'
import { runInAction } from "mobx"


const EditCollectionModal = observer(({ collId, show, onHide, collName }) => {
    const { fullCollections } = useContext(Context)
    const [name, setName] = useState(`${collName}`)


    const editColl = () => {
        if (!name) return (onHide(), fullCollections.setMenuColl(''))
        editCollection(collId, name)
        onHide()
        fullCollections.setMenuColl('')
        runInAction(() => {
            const index = fullCollections.collections.findIndex(el => el._id === collId)
            fullCollections.collections[index].name = name
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
})


export default EditCollectionModal



