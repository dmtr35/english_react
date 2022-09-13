import React from "react"
import { deleteCollection } from "../../http/collectionApi"
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setMenuCollPayload, setCancelDeleteCollPayload, setCollectionsPayload, setRandomListWordsPayload, setModalDelTimeoutPayload } from '../../store/collectionsReducer'


const TimeoutCollectionDelete = ({ collId }) => {
    const dispatch = useDispatch()
    const collections = useSelector(state => state.collectionsReducer.collections)
    const randomListWords = useSelector(state => state.collectionsReducer.randomListWords)
    const modalDelTimeout = useSelector(state => state.collectionsReducer.modalDelTimeout)
    const setMenuColl = (value) => { dispatch(setMenuCollPayload(value)) }
    const setCancelDeleteColl = (value) => { dispatch(setCancelDeleteCollPayload(value)) }
    const setCollections = (value) => { dispatch(setCollectionsPayload(value)) }
    const setRandomListWords = (value) => { dispatch(setRandomListWordsPayload(value)) }
    const setModalDelTimeout = (value) => { dispatch(setModalDelTimeoutPayload(value)) }




    const deleteColl = (id) => {
        setMenuColl('')
        setModalDelTimeout([...modalDelTimeout, id])
        const timeoutId = setTimeout(() => {
            deleteCollection(id)
            setCollections(collections.filter(i => i._id !== (id)))
            setRandomListWords(randomListWords.filter(i => i.collectionId !== (id)))
            setModalDelTimeout(modalDelTimeout.filter(i => i !== id))
        }, [2000])
        setCancelDeleteColl(timeoutId)
    }



    return (
        <>
            <AiOutlineDelete
                className="iconMenuColl"
                onClick={() => deleteColl(collId)}
            />
        </>
    )
}



export default TimeoutCollectionDelete



