function Question({ question, dispatch, userAnswer }) {
  return (
    <div>
      <a href={question.question} target="blank">
        <img
          src={question.question}
          alt="question"
          style={{ height: "100%", width: "100%" }}
        />
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
