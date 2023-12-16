import { useEffect, useReducer } from "react";
import MainEle from "./MainEle";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import ResultScreen from "./ResultScreen";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";
import data from "../data/questions - Copy.json";
import { putScore } from "./services/putScore";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  score: 0,
  userAnswer: null,
  highScore: JSON.parse(localStorage.getItem("highscore")),
  timeLeft: null,
  name: null,
  email: null,
  college: null,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "dataRetrieved":
      return {
        ...state,
        questions: setQuestions(action.payload),
        status: "ready",
      };
    case "dataRetrievalFailed":
      console.log(action.payload.message);
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "start",
        // timeLeft: 30 * 60,
        timeLeft: 4 * 60,
        name: action.payload.name,
        email: action.payload.email,
        college: action.payload.college,
      };
    case "next":
      if (
        state.index === state.questions?.length - 1 &&
        state.highScore < state.score
      ) {
        console.log(JSON.parse(localStorage.getItem("highscore")));
        localStorage.setItem("highscore", JSON.stringify(state.score));
        console.log(JSON.parse(localStorage.getItem("highscore")));
      }
      return state.index === state.questions?.length - 1
        ? {
            ...state,
            status: "end",
            highScore:
              state.highScore < state.score ? state.score : state.highScore,
          }
        : { ...state, index: state.index + 1, userAnswer: null };
    case "submitAns": {
      let newScore = state.score;
      if (state.questions[state.index].correctOption === action.payload) {
        newScore += state.questions[state.index].points;
      }
      return {
        ...state,
        score: newScore,
        userAnswer: action.payload + 1,
      };
    }
    case "reset":
      return {
        ...initialState,
        questions: shuffleArray(state.allQuestions).slice(0, 50),
        allQuestions: state.allQuestions,
        status: "ready",
        highScore: state.highScore,
      };
    case "tick":
      if (state.timeLeft <= 0)
        return {
          ...state,
          status: "end",
          highScore:
            state.highScore < state.score ? state.score : state.highScore,
        };

      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };
    default:
      console.log("action does not exist");
      return state;
  }
};
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
function setQuestions(array) {
  // let updatedQuestions = [
  //   array[0],
  //   array[1],
  //   array[2],
  //   ...shuffleArray(array.slice(3, 15)).slice(0, 3),
  //   array[15],
  //   array[16],
  //   array[17],
  //   ...shuffleArray(array.slice(18, 30)).slice(0, 3),
  //   array[30],
  //   array[31],
  //   array[32],
  //   ...shuffleArray(array.slice(33, 45)).slice(0, 3),
  //   array[45],
  //   array[46],
  //   array[47],
  //   ...shuffleArray(array.slice(48, 60)).slice(0, 3),
  //   array[60],
  //   array[61],
  //   array[62],
  //   ...shuffleArray(array.slice(63, 75)).slice(0, 3),
  // ];
  // console.log(updatedQuestions);
  // updatedQuestions = [
  //   ...shuffleArray(updatedQuestions.slice(0, 6)),
  //   ...shuffleArray(updatedQuestions.slice(6, 12)),
  //   ...shuffleArray(updatedQuestions.slice(12, 18)),
  //   ...shuffleArray(updatedQuestions.slice(18, 24)),
  //   ...shuffleArray(updatedQuestions.slice(24, 30)),
  // ];
  let updatedQuestions = array;
  return updatedQuestions;
}

function App() {
  const [
    {
      questions,
      status,
      index,
      score,
      userAnswer,
      highScore,
      timeLeft,
      name,
      email,
      college,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        // const res = await fetch("http://localhost:9000/questions");
        // if (!res.ok) throw new Error("error in fetching data");
        // const data = await res.json();
        const quesData = data.questions;
        dispatch({ type: "dataRetrieved", payload: quesData });
      } catch (err) {
        dispatch({ type: "dataRetrievalFailed", payload: err });
      }
    }
    fetchQuestions();
  }, []);
  const totalPoints = questions?.reduce(
    (rec, question) => rec + question.points,
    0
  );
  function formatMMSS(timeLeft) {
    const timeTaken = 4 * 60 - timeLeft;
    return `${Math.floor(timeTaken / 60)}mins ${timeTaken % 60}secs`;
  }
  useEffect(
    function () {
      if (status === "end") {
        putScore({
          name: name,
          email: email,
          score: score,
          college: college,
          // change for prod to 30*60-timeLeft
          timeTaken: formatMMSS(timeLeft),
        }).then((data) => console.log(data));
      }
    },
    [status, email, name, score, college, timeLeft]
  );
  return (
    <div className="app">
      <MainEle>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} />}
        {status === "start" && (
          <>
            <Progress
              numQuestions={questions?.length}
              index={index}
              userAnswer={userAnswer}
            />
            <Question
              question={questions[index]}
              userAnswer={userAnswer}
              dispatch={dispatch}
            />
            <Footer>
              <NextButton
                userAnswer={userAnswer}
                dispatch={dispatch}
                index={index}
                numQuestions={questions?.length}
              />
              <Timer timeLeft={timeLeft} dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "end" && (
          <ResultScreen name={name} email={email} college={college} />
        )}
      </MainEle>
    </div>
  );
}

export default App;
