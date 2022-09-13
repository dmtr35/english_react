import React from 'react'
import Modal from "react-bootstrap/Modal"
import Image from 'react-bootstrap/Image'
import info from '../assets/info.png'


const InstructionModal = ({ show, onHide }) => {


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Image
                className='image_info_modal'
                src={info}
            />
        </Modal>
    )
}


export default InstructionModal



