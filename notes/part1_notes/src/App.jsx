const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age}
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="kobe" age={20} />
      <Hello name="james" age={80} />
    </div>
  );
};

export default App;
