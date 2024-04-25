import { useState, useEffect } from "react";
import { Question } from "../types";
import { QuestionPreview } from "./QuestionPreview";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import * as client from '../client'

export const QuizPreview = () => {
  const { courseId, quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const findAllQuestionsForQuiz = async () => {
    const questionInfo = await client.findAllQuestionsForQuiz(quizId ?? '1');
    setQuestions(questionInfo.questions as Question[]);
  }

  useEffect(() => {
    findAllQuestionsForQuiz();
  }, []);

  const getCurrentQuestion = () => {
    if (currQuestionIndex > questions.length || currQuestionIndex < 0) {
      return undefined;
    }

    return questions[currQuestionIndex]
  }

  const question = getCurrentQuestion();

  const nextQuestion = () => {
    setCurrQuestionIndex(currQuestionIndex + 1);
  }

  const previousQuestion = () => {
    setCurrQuestionIndex(currQuestionIndex - 1);
  }
  return(
    <div className="m-5">
      <div className="alert alert-danger d-flex align-items-center" role="alert"><FaInfoCircle /><p className="px-2 my-0">This is a preview of the pubished version of this quiz</p></div>
      <h3>Quiz Instructions</h3>
      <hr />
      {question ? <QuestionPreview question={question} questionNum={currQuestionIndex}/> : <h1>No questions found</h1>}
      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-light mx-2" onClick={previousQuestion} disabled={currQuestionIndex <= 0}>Previous</button>
        <button className="btn btn-light" onClick={nextQuestion} disabled={currQuestionIndex >= questions.length - 1}>Next</button>
      </div>
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`}>Keep editing this quiz</Link>
      <div className="my-3">
        <h5>Questions</h5>
        <ul style={{listStyleType: 'none', cursor: 'pointer'}}>
          {questions.map((_, index) => {
            return <li onClick={() => {setCurrQuestionIndex(index)}} key={index}><FaInfoCircle /> {`Question ${index + 1}`}</li>
          })}
        </ul>
      </div>
    </div>
  )
}