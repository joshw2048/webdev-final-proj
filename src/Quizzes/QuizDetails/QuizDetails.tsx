import { quizArray } from "../exampleQuizzes";
import { Quiz } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { translateBooleanToStringValue } from '../utils';
import "./index.css"
import { FaCheckCircle, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import * as client from "../client"

export const QuizDetails = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz>(quizArray[0]);

  const findQuiz = async () => {
    const q = await client.findQuizById(quizId ?? '1');
    setQuiz(q);
  }

  const updateQuizPublished = async (publishedValue: boolean) => {
    try {
      const updatedQuiz: Quiz = {...quiz, published: publishedValue}
      await client.updateQuiz(updatedQuiz);
      setQuiz(updatedQuiz)
    } catch (error) {

    }
  }

  useEffect(() => {
    findQuiz();
  }, []);

  return(
    <div className='assignments-container'>
    <div className="top-content">
      <div></div>
      <div className="button-group">
        {quiz.published === false ? 
          <button onClick={() => updateQuizPublished(true)} className="btn btn-success mx-2"><FaCheckCircle />Publish</button> :
          <button onClick={() => updateQuizPublished(false)} className="btn btn-danger mx-2">Unpublish</button>}
        <button 
          className="btn btn-light mx-2"
          onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`)}
        >
          Preview
        </button>
        <button 
          className="btn btn-light mx-2" 
          onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/details`)}
        >
          <FaPencilAlt />
          Edit
        </button>
        <button className="btn btn-light mx-2"><FaEllipsisV /></button> 
      </div>
    </div>
    <div className="assignments-wrapper">
      <hr />
      <h3>{quiz?.name}</h3>
      <table className="center-table">
        <tbody>
          <tr>
            <td>Quiz Type</td>
            <td>{quiz?.quizType}</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>{quiz?.points}</td>
          </tr>
          <tr>
            <td>Assignment Group</td>
            <td>{quiz?.assignmentGroup}</td>
          </tr>
          <tr>
            <td>Shuffle Answers</td>
            <td>{translateBooleanToStringValue(quiz?.shuffleAnswers)}</td>
          </tr>
          <tr>
            <td>Time Limit</td>
            <td>{quiz?.timeLimit} minutes</td>
          </tr>
          <tr>
            <td>Multiple Attempts</td>
            <td>{translateBooleanToStringValue(quiz?.multipleAttempts)}</td>
          </tr>
          <tr>
            <td>Show Correct Answers</td>
            <td>{quiz?.showCorrectAnswers ? "immediately" : "No"} </td>
          </tr>
          <tr>
            <td>Access Code</td>
            <td>{quiz?.accessCode === '' ? 'None' : quiz?.accessCode}</td>
          </tr>
          <tr>
            <td>One Question at a Time</td>
            <td>{translateBooleanToStringValue(quiz?.oneQuestionAtTime)}</td>
          </tr>
          <tr>
            <td>Webcam Required</td>
            <td>{translateBooleanToStringValue(quiz?.webcamRequired)}</td>
          </tr>
          <tr>
            <td>Lock Questions After Answering</td>
            <td>{translateBooleanToStringValue(quiz?.lockQuestionsAfterAnswering)}</td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${new Date(quiz?.dueDate).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})}`}</td>
            <td>Everyone</td>
            <td>{`${new Date(quiz?.availableDate).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})}`}</td>
            <td>{`${new Date(quiz?.untilDate).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}
