import React from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import { deleteWord } from '../../http/collectionApi'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuWordPayload, setRandomListWordsPayload } from '../../store/collectionsReducer'


const DeleteWord = ({ wordId, collId }) => {
    const dispatch = useDispatch()
    const menuWord = useSelector(state => state.collectionsReducer.menuWord)
    const randomListWords = useSelector(state => state.collectionsReducer.randomListWords)
    const activeTurnWords = useSelector(state => state.collectionsReducer.activeTurnWords)
    const setMenuWord = (value) => { dispatch(setMenuWordPayload(value)) }
    const setRandomListWords = (value) => { dispatch(setRandomListWordsPayload(value)) }



    const delWord = (wordId, collId) => {
        deleteWord(wordId, collId)
        setRandomListWords(randomListWords.filter(i => i.wordId !== (wordId)))
        if (menuWord.includes(wordId)) {
            setMenuWord('')
        }
    }



    return (
        <div>
            <>
                {activeTurnWords.includes(wordId)
                    ?
                    <AiOutlineDelete
                        className="imageMemu"
                        style={{ color: '#fff' }}
                        onClick={() => delWord(wordId, collId)}
                    />
                    :
                    <AiOutlineDelete
                        className="imageMemu"
                        style={{ color: '#000' }}
                        onClick={() => delWord(wordId, collId)}
                    />
                }
            </>
        </div>
    )
}



export default DeleteWord
