import { useState } from "react";
import Loader from "./Loader";

function Question({ question, dispatch, userAnswer }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  function handleImageLoad() {
    setLoading(false);
  }
  function handleError() {
    setLoading(false);
    setError(true);
  }
  return (
    <div>
      {loading && <Loader />}
      <a href={question.question} target="blank">
        {error ? (
          <p>Click to view question</p>
        ) : (
          <img
            src={question.question}
            alt="Click to view question"
            style={{ height: "100%", width: "100%" }}
            onLoad={handleImageLoad}
            onError={handleError}
          />
        )}
      </a>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option 
          ${i === userAnswer - 1 && "answer correct"}
          ${userAnswer && i !== userAnswer - 1 && "wrong"}`}
            disabled={userAnswer}
            onClick={() => dispatch({ type: "submitAns", payload: i })}
            key={i}
          >
            {option}
          </button>
        ))}
      </div>

      {/* {(userAnswer) && (
        <button className="btn " onClick={() => dispatch({ type: "next" })}>
          Next
        </button>
      )} */}
    </div>
  );
}

export default Question;
