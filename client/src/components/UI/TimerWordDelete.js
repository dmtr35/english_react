import React, { useState, useEffect, useContext } from "react"
import { Context } from "../.."
import { observer } from "mobx-react-lite"


const TimerWordDelete = observer(({ wordId }) => {
    const [counter, setCounter] = useState(3)
    const { fullCollections } = useContext(Context)


    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    }, [counter])

    return (
        <>
            {fullCollections.activeTurnWord.includes(wordId)
                ?
                <div
                    className="timerWordDelete"
                    style={{ color: '#fff' }}
                >
                    {counter}
                </div>
                :
                <div
                    className="timerWordDelete"
                    style={{ color: '000' }}
                >
                    {counter}
                </div>
            }
        </>
    )
})



export default TimerWordDelete
