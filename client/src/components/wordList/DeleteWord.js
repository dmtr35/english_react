import React, { useContext } from "react"
import { Context } from "../../.."
import { observer } from "mobx-react-lite"
import { AiOutlineDelete } from 'react-icons/ai'
import { deleteWord } from '../../../http/collectionApi'


const DeleteWord = observer(({ wordId, collId }) => {
    const { fullCollections } = useContext(Context)
    

    const delWord = (wordId, collId) => {
        deleteWord(wordId, collId)
        fullCollections.setRandomListWords(fullCollections.randomListWords.filter(i => i.wordId !== (wordId)))
        if (fullCollections.menuWord.includes(wordId)) {
            fullCollections.setMenuWord('')
        }
    }


    return (
        <div>
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
        </div>
    )
})



export default DeleteWord
