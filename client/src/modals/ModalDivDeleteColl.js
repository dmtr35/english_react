import React from 'react'
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from 'react-redux'
import { setModalDelTimeoutPayload } from '../store/collectionsReducer'


const ModalDivDeleteColl = ({ collId, cancelDeleteColl }) => {
    const dispatch = useDispatch()
    const modalDelTimeout = useSelector(state => state.collectionsReducer.modalDelTimeout)
    const setModalDelTimeout = (value) => { dispatch(setModalDelTimeoutPayload(value)) }



    const cancelDell = (collId) => {
        clearTimeout(cancelDeleteColl)
        setModalDelTimeout(modalDelTimeout.filter(i => i !== collId))
    }

    return (
        <>
            {modalDelTimeout.includes(collId)
                ?
                <Button className="button modal_del_timeout"
                    onClick={() => cancelDell(collId)}
                    variant="primary"
                    size="lg"
                >Отменить</Button>
                :
                null
            }
        </>
    )
}


export default ModalDivDeleteColl



