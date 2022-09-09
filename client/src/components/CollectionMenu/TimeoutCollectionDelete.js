import React, { useContext, useState } from "react"
import { deleteCollection } from "../../http/collectionApi"
import { observer } from "mobx-react-lite"
import { Context } from "../.."
import { AiOutlineDelete } from 'react-icons/ai'
import ModalDivDeleteColl from '../../modals/ModalDivDeleteColl'
import Button from "react-bootstrap/Button"



const TimeoutCollectionDelete = observer(({ collId }) => {
    const { fullCollections } = useContext(Context)
    const [cancelDeleteColl, setCancelDeleteColl] = useState(null)
    console.log(cancelDeleteColl);


    const deleteColl = async (id) => {
        fullCollections.setMenuColl('')
        fullCollections.setModalDelTimeout([...fullCollections.modalDelTimeout, id])
        const timeoutDelColl = await setTimeout(() => {

            // deleteCollection(id)
            fullCollections.setCollections(fullCollections.collections.filter(i => i._id !== (id)))
            fullCollections.setRandomListWords(fullCollections.randomListWords.filter(i => i.collectionId !== (id)))

            fullCollections.setModalDelTimeout(fullCollections.modalDelTimeout.filter(i => i !== id))
        }, [3000])
        console.log(timeoutDelColl)
        setCancelDeleteColl(timeoutDelColl)
    }


    // const deleteColl = (collId) => {
    //     const timeoutId = setTimeout(() => {
    //         // deleteCollection(collId)
    //         // .then(data => fullCollections.setIsLoadColleltions(true))
    //     }, 5000)
    //     setTimeoutCollDelete(timeoutId)
    // }

    return (
        <>
            <AiOutlineDelete
                className="iconMenuColl"
                onClick={() => deleteColl(collId)}
            />
            <ModalDivDeleteColl
                cancelDeleteColl={cancelDeleteColl}
            />

        </>
    )
})



export default TimeoutCollectionDelete



