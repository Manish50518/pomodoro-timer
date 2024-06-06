import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [min, setMin] = useState(30);
  const [sec, setSec] = useState(0);
  const [title, setTitle] = useState("Ready to go for another round?");
  const intervalRef = useRef(null);
  const startTimer = () => {
    if (start === true) {
      return;
    }
    setStart(true);

    let time = parseInt(min) * 60 + parseInt(sec - 1);
    setTitle("You are doing great!");
    intervalRef.current = setInterval(() => {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);

      setMin(min);
      setSec(sec);
      time--;
      if (time === -1) {
        clearInterval(intervalRef.current);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;
    setTitle("Keep it going!");
    clearInterval(intervalRef.current);
    intervalRef.current = null;

    setStart(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setMin(30);
    setSec(0);
    setStart(false);
  };

  return (
    <div className="main-cont">
      <div className="App">
        <div className="title-cont">
          <h1 className="title">{title}</h1>
        </div>

        <p>{`${min}:${sec === 0 ? "00" : sec}`}</p>
        <div className="btn-cont">
          {" "}
          {!start && (
            <button className="btn" onClick={startTimer}>
              Start
            </button>
          )}
          {start && (
            <button className="btn" onClick={stopTimer}>
              Stop
            </button>
          )}
          <button onClick={resetTimer} className="btn">
            Reset
          </button>
        </div>
        <h4>
          "Time management is not about doing the most things in the least
          amount of time. It's about doing the most important things in the
          right amount of time." <span>- Unknown</span>
        </h4>
      </div>
    </div>
  );
}

export default App;
