import React, { useContext } from "react"
import TypeBar from '../components/TypeBar'
import { Context } from ".."

const Settings = () => {
    const checkDelayWordDelete = JSON.parse(localStorage.getItem('delayWordDelete'))


    
    const delayWordDelete = () => {
        if (localStorage.getItem('delayWordDelete') === 'false'|| localStorage.getItem('delayWordDelete') === null) {
            localStorage.setItem('delayWordDelete', true)
        } else localStorage.setItem('delayWordDelete', false)
    }



    return (
        <div>
            <TypeBar />
            <div className='sett_parent'>
                <div className='sett'>
                    <div className='sett_one_row_titel'>
                        Settings
                    </div>
                    <div className='sett_row'>
                        <input
                            className="settings_input"
                            style={{ cursor: 'pointer' }}
                            type="checkbox"
                            value="checked"
                            onClick={() => delayWordDelete()}
                            defaultChecked={checkDelayWordDelete}
                        />
                        <p className="settings_text">Задержка при удалении коллекции</p>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Settings

