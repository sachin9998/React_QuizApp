import { useRef, useState } from "react";
import { data } from "../../assets/data";
import "./Quiz.css";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAnswer = (e, ans) => {
    if (lock == false) {
      if (ans === question.answer) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.answer - 1].current.classList.add("correct");
      }
    }
    setLock(true);
  };

  const handleNext = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }

      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);

      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const handleReset = () => {
    setIndex(0);
    setQuestion(data[index]);
    setLock(false);
    setResult(false);
    setScore(0);
  };

  return (
    <div className="container">
      <h1>Quiz App by Sachin</h1>
      <hr />

      {result ? (
        <>
          <h2>
            You Scored: {score} out of {data.length}
          </h2>

          <button onClick={handleReset} type="button">
            Reset
          </button>
        </>
      ) : (
        <>
          {" "}
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAnswer(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAnswer(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAnswer(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAnswer(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={handleNext} type="button">
            Next
          </button>
        </>
      )}

      <div className="index">
        {index + 1} of {data.length} questions
      </div>
    </div>
  );
};

export default Quiz;
