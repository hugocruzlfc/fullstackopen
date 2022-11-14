import { useState } from "react";

function App() {
  // save clicks of each button to its own state
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);
  // const [all, setAll] = useState(0);

  const [commentType, setCommentType] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
  });

  const [positive, setPositive] = useState(0);
  const [average, setAverage] = useState(0);

  const [recopiledComments, setRecopiledComments] = useState(false);

  const handleOnClick = (comment) => {
    if (comment === "Recopiled") {
      handleRecopiledComments();
      return;
    }
    setCommentType({
      ...commentType,
      [comment]: commentType[comment] + 1,
      all: commentType.all + 1,
    });
  };

  // const handleClickGood = () => {
  //   setGood(good + 1);
  //   setAll(all + 1);
  //   // getAverage();
  //   // getPositivePercent();
  // };

  // (prevCount) => prevCount + 1;

  // const handleClickNeutral = () => {
  //   setNeutral(neutral + 1);
  //   setAll(all + 1);
  //   // getAverage();
  //   // getPositivePercent();
  // };

  // const handleClickBad = () => {
  //   setBad(bad + 1);
  //   setAll(all + 1);
  //   // getAverage();
  //   // getPositivePercent();
  // };

  const getPositivePercent = () => {
    const percent = (commentType.good * 100) / commentType.all;
    setPositive(percent);
  };

  const getAverage = () => {
    const socore = (commentType.good - commentType.bad) / commentType.all;
    setAverage(socore);
  };

  const handleRecopiledComments = () => {
    setRecopiledComments(true);
    getPositivePercent();
    getAverage();
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button
        name="good"
        handleOnClick={handleOnClick}
      />
      <Button
        name="neutral"
        handleOnClick={handleOnClick}
      />
      <Button
        name="bad"
        handleOnClick={handleOnClick}
      />
      <br />
      <br />
      <br />
      <Button
        name="Recopiled"
        handleOnClick={handleOnClick}
      />
      {recopiledComments ? (
        <>
          <h3>Statics</h3>

          <Statistics
            average={average}
            positive={positive}
            commentType={commentType}
          />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

const Statistics = ({ average, positive, commentType }) => {
  const { good, bad, neutral, all } = commentType;
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <Statistic
                text="good"
                value={good}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic
                text="bad"
                value={bad}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic
                text="neutral"
                value={neutral}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic
                text="all"
                value={all}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <p>average: {average}</p>
      <p>positive: {positive} %</p>
    </>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};

const Button = ({ name, handleOnClick }) => {
  return <button onClick={() => handleOnClick(name)}>{name}</button>;
};

export default App;
