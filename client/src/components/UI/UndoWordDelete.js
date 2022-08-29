import React, { useContext, useState, useEffect } from "react"
import { FcUndo } from 'react-icons/fc'
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import Timer from './Timer'



const UndoWordDelete = observer(({ wordId, timeout }) => {

    const { fullCollections } = useContext(Context)



    const undoWordDelete = (timeout, wordId) => {
        if (fullCollections.arrWordsToDelete.includes(wordId)) {
            fullCollections.setArrWordsToDelete(fullCollections.arrWordsToDelete.filter(i => i !== wordId))
        }
        fullCollections.setMenuWord('')
        clearTimeout(timeout)
    }


    return (
        <>
            <Timer
                wordId={wordId}
            />
            <FcUndo
                className="imageMemu"
                onClick={() => { undoWordDelete(timeout, wordId) }}
            />
        </>
    )
})



export default UndoWordDelete
