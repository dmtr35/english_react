import React, { useEffect } from "react"
import Card from "react-bootstrap/Card"
import { isCheckTrue } from "../utils/dopFunction"
import { AiOutlineMenu } from 'react-icons/ai'
import { getWords } from '../http/collectionApi'
import MenuWord from './WordMenu/MenuWord'

import { useDispatch, useSelector } from 'react-redux'
import { setMenuCollPayload, setMenuWordPayload, setRandomListWordsPayload, setActiveTurnWordsPayload } from '../store/collectionsReducer'

const WordsList = ({ search }) => {
    const dispatch = useDispatch()
    const isLoadCollections = useSelector(state => state.collectionsReducer.isLoadCollections)
    const checked = useSelector(state => state.collectionsReducer.checked)
    const menuWord = useSelector(state => state.collectionsReducer.menuWord)
    const randomListWords = useSelector(state => state.collectionsReducer.randomListWords)
    const activeTurnWords = useSelector(state => state.collectionsReducer.activeTurnWords)
    const setMenuColl = (value) => { dispatch(setMenuCollPayload(value)) }
    const setMenuWord = (value) => { dispatch(setMenuWordPayload(value)) }
    const setRandomListWords = (value) => { dispatch(setRandomListWordsPayload(value)) }
    const setActiveTurnWords = (value) => { dispatch(setActiveTurnWordsPayload(value)) }

    const userId = localStorage.getItem('userId')
    const arrCheck = JSON.parse((localStorage.getItem(`arrCheck-${userId}`)))


    useEffect(() => {
        getWords(arrCheck)
            .then(data => wordsList(data))
    }, [checked, isLoadCollections])


    const turnWord = (id) => {
        if (activeTurnWords.includes(id)) {
            if (menuWord) {
                setMenuWord('')
            } else {
                setMenuWord('')
                setMenuColl('')
                setActiveTurnWords(activeTurnWords.filter(i => i !== id))
            }
        } else {
            if (menuWord) {
                setMenuWord('')
            } else {
                setMenuWord('')
                setMenuColl('')
                setActiveTurnWords([...activeTurnWords, id])
            }
        }
    }
    const turnMenu = (id) => {
        if (menuWord.includes(id)) {
            setMenuWord('')
        } else {
            setMenuColl('')
            setMenuWord(id)
        }
    }

    const wordsList = (data) => {
        // console.log('data1:', data)
        let random = []
        data.filter(collection => isCheckTrue(collection.collId))
            .map((collection) =>
                collection.words
                    .map((word) =>
                        random
                            .push({ collectionId: collection.collId, wordId: word._id, eng: word.eng, rus: word.rus })
                    ))
        if (localStorage.getItem('switch') === 'true') random.sort(() => Math.random() - 0.5)
        setRandomListWords(random)
        // console.log('random:', random)
    }


    return (
        <div>
            {randomListWords
                .filter(word => word.eng.includes(search) || word.rus.includes(search))
                .filter(word => arrCheck.includes(word.collectionId))
                .map((word) =>
                    <div
                        key={word.wordId}
                        className=" m-2 words_list"
                    >
                        <Card className="wordblock"
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="d-flex"
                            >
                                {!activeTurnWords.includes(word.wordId)
                                    ?
                                    <>
                                        <div
                                            className={'wordEng w-100'}
                                            onClick={() => turnWord(word.wordId)}
                                        >
                                            {word.eng}
                                        </div>
                                        {!menuWord.includes(word.wordId)
                                            ?
                                            <div className="menu1IconParent">
                                                <div
                                                    className="menu1Icon"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <AiOutlineMenu
                                                        className="imageMemu"
                                                        onClick={() => { turnMenu(word.wordId) }}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <MenuWord
                                                collId={word.collectionId}
                                                wordId={word.wordId}
                                                eng={word.eng}
                                                rus={word.rus}
                                                turnMenu={turnMenu}
                                            />
                                        }
                                    </>
                                    :
                                    <>
                                        <div
                                            style={{ background: "#0D6EFD", color: '#fff' }}
                                            className={'wordEng w-100'}
                                            onClick={() => turnWord(word.wordId)}
                                        >
                                            {word.rus}
                                        </div>
                                        {!menuWord.includes(word.wordId)
                                            ?
                                            <div className="menu1IconParent">
                                                <div
                                                    className="menu1Icon"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <AiOutlineMenu
                                                        className="imageMemuColor"
                                                        onClick={() => { turnMenu(word.wordId) }}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <MenuWord
                                                collId={word.collectionId}
                                                wordId={word.wordId}
                                                eng={word.eng}
                                                rus={word.rus}
                                                turnMenu={turnMenu}
                                            />
                                        }
                                    </>
                                }
                            </div>
                        </Card>
                    </div>
                )
            }
        </div>
    )
}



export default WordsList
