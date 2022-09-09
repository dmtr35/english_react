import React, { useContext, useState, useEffect } from "react"
import Card from "react-bootstrap/Card"
import { isCheckTrue } from "../utils/dopFunction"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { AiOutlineMenu } from 'react-icons/ai'
import { getWords } from '../http/collectionApi'
import MenuWord from './WordMenu/MenuWord'

const WordsList = observer(({ search }) => {
    const { fullCollections } = useContext(Context)
    const userId = localStorage.getItem('userId')
    const arrCollId = JSON.parse((localStorage.getItem(`arrCheck-${userId}`)))


    useEffect(() => {
        getWords(arrCollId)
            .then(data => wordsList(data))
    }, [fullCollections.checked, fullCollections.isLoadColleltions])


    const turnWord = (id) => {
        if (fullCollections.activeTurnWord.includes(id)) {
            if (fullCollections.menuWord) {
                fullCollections.setMenuWord('')
            } else {
                fullCollections.setMenuWord('')
                fullCollections.setMenuColl('')
                fullCollections.setActiveTurnWord(fullCollections.activeTurnWord.filter(i => i !== id))
            }
        } else {
            if (fullCollections.menuWord) {
                fullCollections.setMenuWord('')
            } else {
                fullCollections.setMenuWord('')
                fullCollections.setMenuColl('')
                fullCollections.setActiveTurnWord([...fullCollections.activeTurnWord, id])
            }
        }
    }
    const turnMenu = (id) => {
        if (fullCollections.menuWord.includes(id)) {
            fullCollections.setMenuWord('')
        } else {
            fullCollections.setMenuColl('')
            fullCollections.setMenuWord(id)
        }
    }

    const wordsList = (data) => {
        // console.log('data1:', data);
        let random = []
        data.filter(collection => isCheckTrue(collection.collId))
            .map((collection) =>
                collection.words
                    .map((word) =>
                        random
                            .push({ collectionId: collection.collId, wordId: word._id, eng: word.eng, rus: word.rus })
                    ))
        if (localStorage.getItem('switch') === 'true') random.sort(() => Math.random() - 0.5)
        fullCollections.setRandomListWords(random)
        // console.log('random:', random)
    }


    return (
        <div>
            {fullCollections.randomListWords
                .filter(word => word.eng.includes(search) || word.rus.includes(search))
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
                                {!fullCollections.activeTurnWord.includes(word.wordId)
                                    ?
                                    <>
                                        <div
                                            className={'wordEng w-100'}
                                            onClick={() => turnWord(word.wordId)}
                                        >
                                            {word.eng}
                                        </div>
                                        {!fullCollections.menuWord.includes(word.wordId)
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
                                        {!fullCollections.menuWord.includes(word.wordId)
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
})



export default WordsList
