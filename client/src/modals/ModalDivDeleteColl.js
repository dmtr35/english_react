import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import Button from "react-bootstrap/Button"


const ModalDivDeleteColl = observer(({ collId, cancelDeleteColl }) => {
    const { fullCollections } = useContext(Context)

    
    const cancelDell = (collId) => {
        
        clearTimeout(cancelDeleteColl)
        fullCollections.setModalDelTimeout(fullCollections.modalDelTimeout.filter(i => i !== collId))
    }

    return (
        <>
            {fullCollections.modalDelTimeout.includes(collId)
                ?
                    <Button className="button modal_del_timeout"
                        onClick={() => cancelDell(collId) }
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



