function ResultScreen({ name, email, college }) {
  return (
    <div className="start">
      <h2>Your quiz has been submitted successfully</h2>
      <div className="resultForm">
        <h4>Name: {name}</h4>
        <h4>Email: {email}</h4>
        <h4>College: {college}</h4>
      </div>
      <h3>You can exit the website now</h3>
    </div>
  );
}

export default ResultScreen;
