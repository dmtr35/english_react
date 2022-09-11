import React, { useContext, useState } from "react"
import { deleteCollection } from "../../http/collectionApi"
import { observer } from "mobx-react-lite"
import { Context } from "../.."
import EditCollectionModal from "../../modals/EditCollectionModal"
import AddWordsModal from "../../modals/AddWordsModal"
import { AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import TimeoutCollectionDelete from './TimeoutCollectionDelete'
import { handleChange } from "../../utils/dopFunction"




const MenuCollection = observer(({ collId, collName, addMenuColl }) => {
    const { fullCollections } = useContext(Context)
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
        fullCollections.setCollections(fullCollections.collections.filter(i => i._id !== (id)))
        fullCollections.setRandomListWords(fullCollections.randomListWords.filter(i => i.collectionId !== (id)))
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
})



export default MenuCollection
