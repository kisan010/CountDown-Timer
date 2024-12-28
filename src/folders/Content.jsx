import { useEffect, useRef, useState } from "react";





const Content = () => {

    const [Time, setTime] = useState(0);
    const [isActive, setisActive] = useState(false);
    const [isPause, setisPause] = useState(true);
    const Reffer = useRef(null);
    console.log(Reffer.current)
    function handleInput(e) {

        setTime(parseInt(e.target.value * 60));

    }
   
    function formatTime(time) {
        console.log(time)
        let min = String(Math.floor(time / 60)).padStart(2, '0');
        let sec = String(time % 60).padStart(2, '0')
        return `${min}:${sec}`
    }

    function handleButtons(e) {
        console.log(e);

        if (e.target.textContent === 'Start') {
            setisActive(true);
            setisPause(false);

        }
        else if (e.target.textContent === 'Pause') {
            setisActive(false);
            setisPause(true);
        }
        else if (e.target.textContent === 'Reset') {
         clearInterval(Reffer.current)
        setisActive(false);
        setisPause(true);
            setTime(null)
        }
    }
    useEffect(() => {
        console.log(Reffer.current)
        if (isActive && !isPause && Time > 0) {
            Reffer.current = setInterval(() => {
                setTime((prev) => prev - 1)
            }, 1000)
           
           
        }
        else if(Time === 0)
        {
            clearInterval(  Reffer.current);
            setisActive(false)
            alert("time  is up")
        }
        return () => clearInterval(Reffer.current)


    }, [isActive, isPause, Time])





    return (
        <>
            <div className="Container">
                <div className="box">
                    <h1>Countdown Timer</h1>
                    <div className="setTimeCOunt">
                        <input type="number" name="time" id="time" onChange={handleInput} placeholder="Enter time in Minutes" ref={Reffer}></input>
                        <h1> {Time ? formatTime(Time) : "00:00"}</h1>
                    </div>
                    <div className="button-group" onClick={handleButtons}>
                        <button>Start</button>
                        <button>Pause</button>
                        <button>Reset</button>
                    </div>
                </div>
            </div>
        </>
    )


}

export default Content;