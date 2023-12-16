function ResultScreen({ name, email, college }) {
  return (
    <div className="start">
      <h2>Your quiz has been submitted successfully</h2>
      <h4>Name: {name}</h4>
      <h4>Email: {email}</h4>
      <h4>College: {college}</h4>
    </div>
  );
}

export default ResultScreen;
