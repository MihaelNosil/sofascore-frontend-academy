import React, {useState} from "react";
import axios from "axios";
import styled from "styled-components";
import he from "he";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const QuestionContainer = styled.div`
  margin-bottom: 2rem;
`;

const AnswerContainer = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Question: React.FC<{
  question: string;
  answers: string[];
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  userAnswer: string;
  correctAnswer: string;
}> = ({
  question,
  answers,
  onAnswer,
  isAnswered,
  userAnswer,
  correctAnswer,
}) => (
  <QuestionContainer>
    <h2>{he.decode(question)}</h2>
    {answers.map((answer, index) => (
      <AnswerContainer key={index}>
        <label>
          <input
            type="radio"
            name="answer"
            value={he.decode(answer)}
            checked={isAnswered && userAnswer === answer} // Check if the answer is selected and has been answered
            onChange={(e) => onAnswer(e.target.value)}
            disabled={isAnswered} // Disable input once answered
          />
          <span
            style={{
              color:
                isAnswered && answer === correctAnswer
                  ? "green" // Mark correct answer as green
                  : answer === userAnswer
                  ? "red" // Mark selected answer as red if incorrect
                  : "inherit",
              fontWeight:
                isAnswered && answer === correctAnswer ? "bold" : "normal", // Bold font for correct answer
            }}
          >
            {answer}
          </span>
        </label>
      </AnswerContainer>
    ))}
  </QuestionContainer>
);

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=15&type=multiple"
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const startQuiz = () => {
    fetchQuestions();
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
  };

  const handleNextQuestion = () => {
    if (userAnswer === "") {
      return; // Return early if no answer is selected
    }

    if (currentQuestionIndex === questions.length - 1) {
      // Last question, quiz completed
      setQuizCompleted(true);
    } else {
      setShowResult(false);
      setIsAnswerCorrect(false);
      setUserAnswer("");
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePlayAgain = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setShowResult(false);
    setIsAnswerCorrect(false);
    setCorrectAnswersCount(0);
    setQuizCompleted(false);
  };

  return (
    <Container>
      {questions.length === 0 && !quizCompleted ? (
        <>
          <h1>Click the button below to start the quiz:</h1>
          <Button onClick={startQuiz}>Start Quiz</Button>
        </>
      ) : (
        <>
          {questions.length > 0 && currentQuestionIndex < questions.length ? (
            <>
              <Question
                question={questions[currentQuestionIndex].question}
                answers={[
                  ...questions[currentQuestionIndex].incorrect_answers,
                  questions[currentQuestionIndex].correct_answer,
                ].sort()}
                onAnswer={handleAnswer}
                isAnswered={showResult}
                userAnswer={userAnswer}
                correctAnswer={questions[currentQuestionIndex].correct_answer}
              />
              {showResult && (
                <p>{isAnswerCorrect ? "Correct!" : "Incorrect!"}</p>
              )}
              <Button onClick={handleNextQuestion}>
                {showResult ? "Next Question" : "Submit Answer"}
              </Button>
            </>
          ) : (
            <>
              <p>No more questions.</p>
              {quizCompleted && (
                <>
                  <Button onClick={handlePlayAgain}>Play Again</Button>
                  <p>
                    Number of correct answers is {correctAnswersCount} out of 15.
                  </p>
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
