import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ good, neutral, bad, allClicks }) => {
  if (allClicks === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text="good" value={good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="neutral" value={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="bad" value={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="all" value={allClicks} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine
                text="average rate"
                value={(good - bad) / allClicks}
              />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="positive rate" value={good / allClicks} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    setAll(allClicks + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(allClicks + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
    setAll(allClicks + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
      />
    </>
  );
};

export default App;
