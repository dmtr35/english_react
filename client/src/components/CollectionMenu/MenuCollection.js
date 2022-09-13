import React, { useState } from "react"
import { deleteCollection } from "../../http/collectionApi"
import EditCollectionModal from "../../modals/EditCollectionModal"
import AddWordsModal from "../../modals/AddWordsModal"
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import TimeoutCollectionDelete from './TimeoutCollectionDelete'
import { handleChange } from "../../utils/dopFunction"
import { useDispatch, useSelector } from 'react-redux'
import { setCollectionsPayload, setRandomListWordsPayload} from '../../store/collectionsReducer'




const MenuCollection = ({ collId, collName, addMenuColl }) => {
    const dispatch = useDispatch()
    const collections = useSelector(state => state.collectionsReducer.collections)
    const randomListWords = useSelector(state => state.collectionsReducer.randomListWords)
    const setCollections = (value) => { dispatch(setCollectionsPayload(value)) }
    const setRandomListWords = (value) => { dispatch(setRandomListWordsPayload(value)) }


    const [editCollectionsVisible, setEditCollectionsVisible] = useState(false)
    const [addWordsVisible, setAddWordsVisible] = useState(false)
    const checkDelayWordDelete = JSON.parse(localStorage.getItem('delayWordDelete'))
    const userId = localStorage.getItem('userId')
    const arrCheck = JSON.parse(localStorage.getItem(`arrCheck-${userId}`))

    const deleteColl = (id) => {
        deleteCollection(id)
            .then(() => localStorage.removeItem(`arrCheck-${userId}`, collId))
            .then(() => localStorage.setItem(`arrCheck-${userId}`, JSON.stringify(arrCheck)))
            .then(() => handleChange(id))
        setCollections(collections.filter(i => i._id !== (id)))
        setRandomListWords(randomListWords.filter(i => i.collectionId !== (id)))
    }


    return (
        <div className="parentMenu">
            <div
                className="menu4IconCollParent"
                style={{ cursor: 'pointer' }}
            >
                <AiOutlinePlusSquare
                    className="iconMenuColl"
                    onClick={() => setAddWordsVisible(true)}
                />
                <AiOutlineEdit
                    className="iconMenuColl"
                    onClick={() => setEditCollectionsVisible(true)}
                />

                {!checkDelayWordDelete ?
                    <AiOutlineDelete
                        className="iconMenuColl"
                        onClick={() => deleteColl(collId)}
                    />
                    :
                    <TimeoutCollectionDelete
                        collId={collId}
                        deleteColl={deleteColl}
                    />
                }

                <AiOutlineMenu
                    className="iconMenuColl"
                    onClick={() => addMenuColl(collId)}
                />

                <AddWordsModal
                    collId={collId}
                    show={addWordsVisible}
                    onHide={() => setAddWordsVisible(false)}
                />
                <EditCollectionModal
                    collId={collId}
                    show={editCollectionsVisible}
                    onHide={() => setEditCollectionsVisible(false)}
                    collName={collName}
                />
            </div>
        </div>
    )
}



export default MenuCollection
