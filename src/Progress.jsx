function Progress({ index, numQuestions, score, totalPoints, userAnswer }) {
  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={index + Number(userAnswer !== null)}
      />
      {/* <p>Section {Math.floor(index/6)+1}/5</p> */}
      <p>Section {index + 1}/5</p>
      <p>
        Question {index + 1}/{numQuestions}
      </p>
      {/* <p>
        {score}/{totalPoints}
      </p> */}
    </div>
  );
}

export default Progress;
