import React, { useContext, useState } from "react"
import "../styles/module.css"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { AiOutlineDelete } from 'react-icons/ai'
import UndoCollectionDelete from './UI/UndoCollectionDelete'
import { deleteWord } from '../http/collectionApi'
import { getCollections, deleteCollection, deleteManyCollection } from "../http/collectionApi"


const TimeoutCollectionDelete = observer(({ wordId, collId }) => {
    const { fullCollections } = useContext(Context)
    const [timeoutCollDelete, setTimeoutCollDelete] = useState('')




    const deleteColl = (collId) => {
        const timeoutId = setTimeout(() => {
            // deleteCollection(collId)
                // .then(data => fullCollections.setIsLoadColleltions(true))
        }, 5000)
        setTimeoutCollDelete(timeoutId)
    }

    return (
        <>
            {true
                ?
                <UndoCollectionDelete
                    className="iconMenuColl"
                    wordId={wordId}
                    timeout={timeoutCollDelete}
                    // onChange={() => setChangeButtonDelete(true)}
                />
                :
                <AiOutlineDelete
                    className="iconMenuColl"
                    onClick={() => deleteColl(collId)}
                    // onChange={() => setChangeButtonDelete(true)}
                />
            }
        </>
    )
})



export default TimeoutCollectionDelete
