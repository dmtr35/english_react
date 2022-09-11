import React, { useContext, useState } from "react"
import { deleteCollection } from "../../http/collectionApi"
import { observer } from "mobx-react-lite"
import { Context } from "../.."
import { AiOutlineDelete } from 'react-icons/ai'
// import ModalDivDeleteColl from '../../modals/ModalDivDeleteColl'
// import Button from "react-bootstrap/Button"



const TimeoutCollectionDelete = observer(({ collId }) => {
    const { fullCollections } = useContext(Context)
    

    const deleteColl = (id) => {
        fullCollections.setMenuColl('')
        fullCollections.setModalDelTimeout([...fullCollections.modalDelTimeout, id])
        const timeoutId = setTimeout(() => {
            deleteCollection(id)
            fullCollections.setCollections(fullCollections.collections.filter(i => i._id !== (id)))
            fullCollections.setRandomListWords(fullCollections.randomListWords.filter(i => i.collectionId !== (id)))
            fullCollections.setModalDelTimeout(fullCollections.modalDelTimeout.filter(i => i !== id))
        }, [2000])
        fullCollections.setCancelDeleteColl(timeoutId)
    }



    return (
        <>
            <AiOutlineDelete
                className="iconMenuColl"
                onClick={() => deleteColl(collId)}
            />
        </>
    )
})



export default TimeoutCollectionDelete



