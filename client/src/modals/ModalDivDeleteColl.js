import React, { useContext } from 'react'
import Modal from "react-bootstrap/Modal"
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import Button from "react-bootstrap/Button"


const ModalDivDeleteColl = observer(({ collId, cancelDeleteColl }) => {
    const { fullCollections } = useContext(Context)
    // console.log(collId);
    console.log(cancelDeleteColl);




    return (
        <>
            {fullCollections.modalDelTimeout.includes(collId)
                ?
                    <Button className="button modal_del_timeout"
                        onClick={() => { clearTimeout(cancelDeleteColl) }}
                        variant="primary"
                        size="lg"
                    >Отменить</Button>
                :
                null
            }
        </>
    )
})


export default ModalDivDeleteColl



