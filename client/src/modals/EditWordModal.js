import React, { useContext, useState } from 'react'
import { Context } from "../index"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { observer } from 'mobx-react-lite'
import { runInAction } from "mobx"
import { Dropdown, Form } from 'react-bootstrap'
import { editWord, deleteAndMove } from '../http/collectionApi'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'


const EditWordModal = observer(({ currentCollId, wordId, show, onHide, engW, rusW }) => {
    const { fullCollections } = useContext(Context)
    const [eng, setEng] = useState(`${engW}`)
    const [rus, setRus] = useState(`${rusW}`)
    const [titleDropdown, setTitleDropdown] = useState('Переместить в другую колекцию')
    const [transferWord, setTransferWord] = useState('')

    // .then(dataId => fullCollections.setRandomListWords(fullCollections.randomListWords.filter(i => i.wordId !== (wordId))))


    const editWordParent = () => {
        if (!eng || !rus) return (onHide(), fullCollections.setMenuWord(''))
        const arrWord = [{ 'eng': `${eng}`, 'rus': `${rus}`, '_id': `${wordId}` }]

        if (titleDropdown === 'Переместить в другую колекцию') {
            editWord(wordId, arrWord)
                .then(data => onHide())
                .then(data => fullCollections.setMenuWord(''))

            runInAction(() => {
                const index = fullCollections.randomListWords.findIndex(el => el.wordId === wordId)
                fullCollections.randomListWords[index].eng = eng
                fullCollections.randomListWords[index].rus = rus
            })
        } else {
            deleteAndMove(transferWord, currentCollId, wordId, arrWord)
                .then(data => onHide())
                .then(data => fullCollections.setMenuWord(''))
            runInAction(() => {
                fullCollections.setRandomListWords(fullCollections.randomListWords.filter(i => i.wordId !== (wordId)))
                fullCollections.setRandomListWords([...fullCollections.randomListWords, { eng, rus, wordId, collectionId: transferWord }])
            })
        }
    }
    
    const titleAndWordId = (collId, collName) => {
        setTitleDropdown(collName)
        setTransferWord(collId)
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
                    Изменить слова
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={eng}
                        onChange={e => setEng(e.target.value)}
                        className='mt-3'
                        placeholder="Введите слово"
                    />
                    <Form.Control
                        value={rus}
                        onChange={e => setRus(e.target.value)}
                        className='mt-3'
                        placeholder="Введите перевод"
                    />
                    <hr />
                    <InputGroup className="mb-3 dropdown_move">
                        <DropdownButton
                            title={titleDropdown}
                        >
                            {fullCollections.collections
                                .filter((data) => data._id !== currentCollId)
                                .map((data) =>
                                    <Dropdown.Item
                                        key={data._id}
                                        className="dropdown_move"
                                        href="#"
                                        onClick={() => titleAndWordId(data._id, data.name)}
                                    >
                                        {data.name}
                                    </Dropdown.Item>
                                )}
                        </DropdownButton>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={editWordParent}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    )
})


export default EditWordModal



