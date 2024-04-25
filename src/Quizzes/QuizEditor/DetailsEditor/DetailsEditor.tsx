
import { AssignmentGroup, Quiz, QuizType, defaultQuizOptions } from "../../types"
import { FaCheckCircle, FaRegTimesCircle, FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react"
import './index.css'
import { Editor } from "@tinymce/tinymce-react";


interface DetailsEditorProps {
  setQuiz: (quiz: Quiz) => void;
  quiz: Quiz;
  saveAndPublish: () => void;
  save: () => void;
}

export const DetailsEditor = (props: DetailsEditorProps) => {
  const { quiz, setQuiz, saveAndPublish, save } = props;
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div className="m-2 p-2 px-3">
      <div className="d-flex justify-content-end my-2">
        <p>{quiz.points} points</p>
        {quiz.published === false ? 
          <div className="mx-3"><FaRegTimesCircle />Not Published</div> : 
          <div className="mx-3"> <FaCheckCircle /> Published</div>}
      </div>
      <hr />
      <div className="details-container">    
        <input 
          className="form-control"
          type="text" 
          title="Quiz name" 
          value={quiz.name} 
          onChange={(e) => setQuiz({...quiz, name: e.target.value })}
        />
        <Editor 
          apiKey="kzaz9q6p91bsbhvej8056yz0r9mtzu36bihtmfwfvcxbyxqx"
          onEditorChange={(newValue, _) => {
            setQuiz({...quiz, instructions: newValue})
          }}
          value={quiz.instructions}
        />
        <select 
          className="form-select" 
          value={quiz.quizType} 
          onChange={(e) => setQuiz({...quiz, quizType: e.target.value as QuizType })}
        >
          <option value="Graded Quiz">Graded Quiz</option>
          <option value="Practice Quiz">Practice Quiz</option>
          <option value="Graded Survey">Graded Survey</option>
          <option value="Ungraded Survey">Ungraded Survey</option>
        </select>
        <div className="d-flex gap-2">
          <label htmlFor="points">Points</label>
          {quiz.points}
        </div>
        <select 
          className="form-select" 
          defaultValue={"Quizzes"} 
          onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value as AssignmentGroup })}
        >
          <option value="Quizzes">Quizzes</option>
          <option value="Exams">Exams</option>
          <option value="Assignments">Assignment</option>
          <option value="Project">Project</option>
        </select>
        <div className="d-flex gap-2">      
          <input 
            name="shuffle"
            type="checkbox" 
            checked={quiz.shuffleAnswers} 
            onChange={() => setQuiz({...quiz, shuffleAnswers: !quiz.shuffleAnswers})}
          />
          <label htmlFor="shuffle">Shuffle Answers</label>
        </div>
        <div className="d-flex justify-content-start align-items-center gap-2">
          <input 
            name="timeLimit"
            type="checkbox" 
            // todo figure thit validation out
            defaultChecked
          />
          <label htmlFor="timeLimit">Time Limit</label>
          <input 
            className="form-control w-25"
            type="number"
            id="quiz-time-limit"
            value={quiz.timeLimit}
            onChange={(e) => setQuiz({...quiz, timeLimit: e.target.value !== "" ? Number(e.target.value) : undefined})}
          />
          <label htmlFor="quiz-time-limit">Minutes</label>
        </div>
        <div className="d-flex gap-2">
          <input 
            name="multipleAttempts"
            type="checkbox" 
            checked={quiz.multipleAttempts} 
            onChange={() => setQuiz({...quiz, multipleAttempts: !quiz.multipleAttempts})}
          />
          <label htmlFor="multipleAttempts">Allow multiple attempts</label>
        </div>
        <div className="d-flex gap-2">
          <input 
            name="showCorrectAnswers"
            type="checkbox" 
            checked={quiz.showCorrectAnswers} 
            onChange={() => setQuiz({...quiz, showCorrectAnswers: !quiz.showCorrectAnswers})}
          />
          <label htmlFor="showCorrectAnswers">Show correct answers</label>
        </div>
        <input 
          className="form-control"
          type="text" 
          title="Access code" 
          value={quiz.accessCode} 
          placeholder="quiz passcode"
          onChange={(e) => setQuiz({...quiz, accessCode: e.target.value })}
        />
        <div className="d-flex gap-2">
          <input 
            name="oneQuestion"
            type="checkbox" 
            checked={quiz.oneQuestionAtTime} 
            onChange={() => setQuiz({...quiz, oneQuestionAtTime: !quiz.oneQuestionAtTime})}
          />
          <label htmlFor="oneQuestion">One question at a time</label>
        </div>
        <div className="d-flex gap-2">
          <input 
            name="webcam"
            type="checkbox" 
            checked={quiz.webcamRequired} 
            onChange={() => setQuiz({...quiz, webcamRequired: !quiz.webcamRequired})}
          />
          <label htmlFor="webcam">Webcam required</label>
        </div>
        <div className="d-flex gap-2">
          <input 
            name="lockQuestions"
            type="checkbox" 
            checked={quiz.lockQuestionsAfterAnswering} 
            onChange={() => setQuiz({...quiz, lockQuestionsAfterAnswering: !quiz.lockQuestionsAfterAnswering})}
          />
          <label htmlFor="lockQuestions">Lock questions after answering</label>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <label htmlFor="dueDate">Due Date: </label>
          <input 
            type="date"
            className="form-control w-25"
            id="dueDate"
            value={quiz.dueDate.toISOString().split('T')[0]}
            onChange={(e) => setQuiz({...quiz, dueDate: new Date(e.target.value)})}
          />
        </div>
        <div className="d-flex gap-2 align-items-center">
          <label htmlFor="availDate">Available Date: </label>
          <input 
            className="form-control w-25"
            type="date"
            id="availDate"
            value={quiz.availableDate.toISOString().split('T')[0]}
            onChange={(e) => setQuiz({...quiz, availableDate: new Date(e.target.value)})}
          />
        </div>
        <div className="d-flex gap-2 align-items-center">
          <label htmlFor="untilDate">Until date: </label>
          <input 
            className="form-control w-25"
            type="date"
            id="untilDate"
            value={quiz.untilDate.toISOString().split('T')[0]}
            onChange={(e) => setQuiz({...quiz, untilDate: new Date(e.target.value)})}
          />
        </div>
      </div>
      <div className="py-2 my-4 d-flex gap-2 border-top border-bottom">
        <button className="btn btn-light" onClick={() => {
          navigate(`/Kanbas/Courses/${courseId}/Quizzes/`)
        }}>Cancel</button>
        <button className="btn btn-light" onClick={() => saveAndPublish()}>Save and Publish</button>
        <button className="btn btn-danger" onClick={() => save()}>Save</button>
      </div>
    </div>
  )
}