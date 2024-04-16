import { quizArray } from "../exampleQuizzes";
import { Quiz } from "../types";
import { Link, useParams } from "react-router-dom";
import { translateBooleanToStringValue } from '../utils';
import "./index.css"
import { FaCheckCircle, FaEllipsisV, FaPencilAlt } from "react-icons/fa";

export const QuizDetails = () => {
  const { quizId } = useParams();
  // TODO: Change this to use backend
  const quiz = quizArray.find((quiz) => quiz._id ?? '' === quizId) ?? quizArray[0];

  return(
    <div className='assignments-container'>
    <div className="top-content">
      <div></div>
      <div className="button-group">
        {/* Todo: add/figure out button functionality */}
        <button className="button publish-button"><FaCheckCircle />Published</button>
        <button className="button">Preview</button>
        <button className="button"><FaPencilAlt />Edit</button>
        <button className="button"><FaEllipsisV /></button> 
      </div>
    </div>
    <div className="assignments-wrapper">
      <hr />
      <h3>{quiz.name}</h3>
      <table className="center-table">
        <tbody>
          <tr>
            <td>Quiz Type</td>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <td>Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td>Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td>Shuffle Answers</td>
            <td>{translateBooleanToStringValue(quiz.shuffleAnswers)}</td>
          </tr>
          <tr>
            <td>Time Limit</td>
            <td>{quiz.timeLimit} minutes</td>
          </tr>
          <tr>
            <td>Multiple Attempts</td>
            <td>{translateBooleanToStringValue(quiz.multipleAttempts)}</td>
          </tr>
          <tr>
            <td>Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers ? "immediately" : "No"} </td>
          </tr>
          <tr>
            <td>Access Code</td>
            <td>{quiz.accessCode === '' ? 'None' : quiz.accessCode}</td>
          </tr>
          <tr>
            <td>One Question at a Time</td>
            <td>{translateBooleanToStringValue(quiz.oneQuestionAtTime)}</td>
          </tr>
          <tr>
            <td>Webcam Required</td>
            <td>{translateBooleanToStringValue(quiz.webcamRequired)}</td>
          </tr>
          <tr>
            <td>Lock Questions After Answering</td>
            <td>{translateBooleanToStringValue(quiz.lockQuestionsAfterAnswering)}</td>
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
            <td>{`${quiz.dueDate.toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})}`}</td>
            <td>Everyone</td>
            <td>{`${quiz.availableDate.toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})}`}</td>
            <td>{`${quiz.untilDate.toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}
