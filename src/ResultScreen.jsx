function ResultScreen({
  score,
  totalPoints,
  highScore,
  dispatch,
  name,
  email,
  college,
}) {
  return (
    <div className="start">
      {/* <div className="result">
        {name}
        {email} scored {score} out of {totalPoints} (
        {Math.round((score / totalPoints) * 100)}%)
      </div> */}
      {/* <div className="highscore">HighScore: {highScore}</div> */}
      {/* <button
        onClick={() => dispatch({ type: "reset" })}
        className="btn btn-ui"
      >
        Reset
      </button> */}
      <h2>Your quiz has been submitted successfully</h2>
      <h4>Name: {name}</h4>
      <h4>Email: {email}</h4>
      <h4>College: {college}</h4>
    </div>
  );
}

export default ResultScreen;
