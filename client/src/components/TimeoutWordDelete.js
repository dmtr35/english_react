import React, { useContext, useState } from "react"
import "../styles/module.css"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { AiOutlineDelete } from 'react-icons/ai'
import UndoWordDelete from './UI/UndoWordDelete'
import { deleteWord } from '../http/collectionApi'


const TimeoutWordDelete = observer(({ wordId, collId }) => {
    const { fullCollections } = useContext(Context)
    const [timeoutWordDelete, setTimeoutWordDelete] = useState('')



    const delWord = (wordId, collId) => {
        if (!fullCollections.arrWordsToDelete.includes(wordId)) {
            fullCollections.setArrWordsToDelete([...fullCollections.arrWordsToDelete, wordId])
        }
        const timeoutId = setTimeout(() => {
            deleteWord(collId, wordId)
                .then(data => fullCollections.setIsLoadColleltions(true))
        }, 3000)
        setTimeoutWordDelete(timeoutId)
    }

    return (
        <>
            {!fullCollections.arrWordsToDelete.includes(wordId)
                ?
                <>
                    {fullCollections.activeTurnWord.includes(wordId)
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
                :
                <>
                    <UndoWordDelete
                        className="imageMemu"
                        wordId={wordId}
                        timeout={timeoutWordDelete}
                    />
                </>
            }
        </>
    )
})



export default TimeoutWordDelete
