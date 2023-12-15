import { useState } from "react";
import Header from "./Header";
function StartScreen({ numQuestions, dispatch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "start", payload: { name, email } });
  }
  return (
    <div className="start">
      <Header />
      <h2>Mathematical Talent Exam</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="beginform">
        <div className="forminput">
          <h4>Name:</h4>
          <input
            className="btn"
            type="text"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="forminput">
          <h4>Email:</h4>
          <input
            className="btn"
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn  "
          // onClick={() => dispatch({ type: "start" })}
        >
          Let's Start
        </button>
      </form>
    </div>
  );
}

export default StartScreen;
