import React, { useState, useEffect, useContext } from "react"
import { Context } from "../.."
import { observer } from "mobx-react-lite"


const TimerCollectionDelete = observer(({ wordId }) => {
    const [counter, setCounter] = useState(5)
    const { fullCollections } = useContext(Context)


    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    }, [counter])

    return (
        <>
            <div
                className="timerCollectionDelete"
                style={{ color: '#000' }}
            >
                {counter}
            </div>
        </>
    )
})



export default TimerCollectionDelete
