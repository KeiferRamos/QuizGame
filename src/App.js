import React, { createContext, useContext, useEffect, useState } from "react";
import "./style.css";
import Question from "./Data";

const GlobalContext = createContext({});

export const AppProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(10);
  const [answer, setAnswer] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [points, setPoints] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        index,
        setIndex,
        time,
        setTime,
        answer,
        setAnswer,
        setStartGame,
        startGame,
        setPoints,
        points,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

function App() {
  const { index, setTime, time, answer, startGame } = useContext(GlobalContext);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime((prev) => (prev -= 1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  return (
    <div className="main-container">
      {index < Question.length ? (
        startGame ? (
          !answer && time > 0 ? (
            <QandA />
          ) : (
            <Next />
          )
        ) : (
          <StartGame />
        )
      ) : (
        <EndGame />
      )}
    </div>
  );
}

function StartGame() {
  const { setStartGame, setTime } = useContext(GlobalContext);

  const start = () => {
    setStartGame(true);
    setTime(10);
  };

  return (
    <div className="start-game container">
      <div>
        <p>Quiz Game</p>
        <button onClick={() => start()}>Start Game</button>
      </div>
    </div>
  );
}

function EndGame() {
  const { points, setIndex, setTime, setAnswer, setPoints } =
    useContext(GlobalContext);

  function playAgain() {
    setIndex(0);
    setTime(10);
    setAnswer("");
    setPoints(0);
  }
  return (
    <div className="end-game container">
      <div>
        <p>That's all</p>
        <p>thank you for playing</p>
        <button onClick={() => playAgain()}>Play Again</button>
        <p style={{ margin: "20px" }}>Score: {points}</p>
      </div>
    </div>
  );
}

function QandA() {
  const { setAnswer, time, index, setPoints } = useContext(GlobalContext);

  const addPoints = (item) => {
    if (item == Question[index].answer) {
      setPoints((prev) => prev + 1);
    }
    setAnswer(item);
  };
  return (
    <div>
      <div className="questionAndtime">
        <div className="question">{Question[index].question}</div>
        <div className="time">{time}</div>
      </div>
      <div className="timer"></div>
      <div className="choices">
        {Question[index].choices.map((item, i) => {
          return (
            <div key={i} onClick={() => addPoints(item)}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Next() {
  const { index, setIndex, setTime, answer, setAnswer } =
    useContext(GlobalContext);
  const next = () => {
    setIndex(index + 1);
    setTime(10);
    setAnswer("");
  };
  return (
    <div className="times-up container">
      <div>
        <p>
          {answer
            ? answer == Question[index].answer
              ? "Nice You're Correct"
              : "Opps That's Wrong"
            : "Time's up"}
        </p>
        <p>answer: {Question[index].answer}</p>
        <button className="next-btn" onClick={next}>
          next
        </button>
      </div>
    </div>
  );
}

export default App;
