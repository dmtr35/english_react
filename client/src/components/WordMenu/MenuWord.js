import React, { useState } from "react"
import EditWordModal from '../../modals/EditWordModal'
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import DeleteWord from './DeleteWord'
import { useSelector } from 'react-redux'




const MenuWord = ({ collId, wordId, eng, rus, turnMenu }) => {
    const activeTurnWords = useSelector(state => state.collectionsReducer.activeTurnWords)
    const [editWordVisible, setEditWordVisible] = useState(false)




    return (
        <div>
            {!activeTurnWords.includes(wordId)
                ?
                <div className="menu3IconParent d-flex">
                    <div
                        className="menu3Icon d-flex"
                        style={{ cursor: 'pointer' }}
                    >
                        <AiOutlineEdit
                            className="imageMemu"
                            onClick={() => setEditWordVisible(true)}
                        />
                        <EditWordModal currentCollId={collId} wordId={wordId} show={editWordVisible} onHide={() => setEditWordVisible(false)} engW={eng} rusW={rus} />
                        <DeleteWord
                            wordId={wordId}
                            collId={collId}
                        />
                        <AiOutlineMenu
                            className="imageMemu"
                            onClick={() => { turnMenu(wordId) }}
                        />
                    </div>
                </div>
                :
                <div className="menu3IconParent d-flex">
                    <div
                        className="menu3IconTimer d-flex"
                        style={{ cursor: 'pointer' }}
                    >
                        <AiOutlineEdit
                            className="imageMemu"
                            onClick={() => setEditWordVisible(true)}
                            style={{ color: '#fff' }}
                        />
                        <EditWordModal currentCollId={collId} wordId={wordId} show={editWordVisible} onHide={() => setEditWordVisible(false)} engW={eng} rusW={rus} />
                        <DeleteWord
                            wordId={wordId}
                            collId={collId}
                        />
                        <AiOutlineMenu
                            className="imageMemu"
                            onClick={() => { turnMenu(wordId) }}
                            style={{ color: '#fff' }}
                        />
                    </div>
                </div>
            }
        </div>
    )
}



export default MenuWord
