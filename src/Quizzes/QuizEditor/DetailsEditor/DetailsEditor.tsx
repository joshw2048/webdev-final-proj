
import { AssignmentGroup, Quiz, QuizType, defaultQuizOptions } from "../../types"
import { Link, useParams } from "react-router-dom";
import { useState } from "react"

export const DetailsEditor = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState<Quiz>({
    ...defaultQuizOptions, 
    name: "Unnamed Quiz", 
    points: 0,
    questions: [],
    showCorrectAnswers: false,
    availableDate: new Date(),
    dueDate: new Date(),
    untilDate: new Date(),
    course: courseId ?? '',
  });

  return (
    <>
    <div>
      <p>{quiz.questions.map((question) => question.points).reduce((acc, val) => acc + val, 0)} points</p>
      Published or not (change this)
    </div>
    {/* will need to make this prettier/update everything, just a placeholder */}
    <hr />
    <div>    
      <input 
        type="text" 
        title="Quiz name" 
        value={quiz.name} 
        onChange={(e) => setQuiz({...quiz, name: e.target.value })}
      />
      {/* wysiwyg element for description/question */}
      <select onChange={(e) => setQuiz({...quiz, quizType: e.target.value as QuizType })}>
        <option selected value="Graded Quiz">Graded Quiz</option>
        <option value="Practice Quiz">Practice Quiz</option>
        <option value="Graded Survey">Graded Survey</option>
        <option value="Ungraded Survey">Ungraded Survey</option>
      </select>
      <select onChange={(e) => setQuiz({...quiz, quizType: e.target.value as QuizType })}>
        <option selected value="Graded Quiz">Graded Quiz</option>
        <option value="Practice Quiz">Practice Quiz</option>
        <option value="Graded Survey">Graded Survey</option>
        <option value="Ungraded Survey">Ungraded Survey</option>
      </select>
      <select onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value as AssignmentGroup })}>
        <option selected value="Quizzes">Quizzes</option>
        <option value="Exams">Exams</option>
        <option value="Assignments">Assignment</option>
        <option value="Project">Project</option>
      </select>
      <div>      
        <input 
          name="shuffle"
          type="checkbox" 
          checked={quiz.shuffleAnswers} 
          onChange={() => setQuiz({...quiz, shuffleAnswers: !quiz.shuffleAnswers})}
        />
        <label htmlFor="shuffle">Shuffle Answers</label>
      </div>
      <div>
        <div>
          <input 
            name="timeLimit"
            type="checkbox" 
            // todo figure thit validation out
            checked
          />
          <label htmlFor="timeLimit">Time Limit</label>
          <input 
            type="number"
            id="quiz-time-limit"
            value="20"
            onChange={(e) => setQuiz({...quiz, timeLimit: e.target.value !== "" ? Number(e.target.value) : undefined})}
          />
          <label htmlFor="quiz-time-limit">Minutes</label>
        </div>
      </div>
      <div>
        <input 
          name="multipleAttempts"
          type="checkbox" 
          checked={quiz.multipleAttempts} 
          onChange={() => setQuiz({...quiz, multipleAttempts: !quiz.multipleAttempts})}
        />
        <label htmlFor="multipleAttempts">Allow multiple attempts</label>
      </div>
      <div>
        <input 
          name="showCorrectAnswers"
          type="checkbox" 
          checked={quiz.showCorrectAnswers} 
          onChange={() => setQuiz({...quiz, showCorrectAnswers: !quiz.showCorrectAnswers})}
        />
        <label htmlFor="showCorrectAnswers">Show correct answers</label>
      </div>
      <input 
        type="text" 
        title="Access code" 
        value={quiz.accessCode} 
        onChange={(e) => setQuiz({...quiz, accessCode: e.target.value })}
      />
      <div>
        <input 
          name="oneQuestion"
          type="checkbox" 
          checked={quiz.oneQuestionAtTime} 
          onChange={() => setQuiz({...quiz, oneQuestionAtTime: !quiz.oneQuestionAtTime})}
        />
        <label htmlFor="oneQuestion">One question at a time</label>
      </div>
      <div>
        <input 
          name="webcam"
          type="checkbox" 
          checked={quiz.webcamRequired} 
          onChange={() => setQuiz({...quiz, webcamRequired: !quiz.webcamRequired})}
        />
        <label htmlFor="webcam">Webcam required</label>
      </div>
      <div>
        <input 
          name="lockQuestions"
          type="checkbox" 
          checked={quiz.lockQuestionsAfterAnswering} 
          onChange={() => setQuiz({...quiz, lockQuestionsAfterAnswering: !quiz.lockQuestionsAfterAnswering})}
        />
        <label htmlFor="lockQuestions">Lock questions after answering</label>
      </div>
      <div>
        <label htmlFor="dueDate">Due Date: </label>
        <input type="date"
          id="dueDate"
          value={quiz.dueDate.toISOString().split('T')[0]}
          onChange={(e) => setQuiz({...quiz, dueDate: new Date(e.target.value)})}
        />
      </div>
      <div>
        <label htmlFor="availDate">Available Date: </label>
        <input type="date"
          id="availDate"
          value={quiz.availableDate.toISOString().split('T')[0]}
          onChange={(e) => setQuiz({...quiz, availableDate: new Date(e.target.value)})}
        />
      </div>
      <div>
        <label htmlFor="untilDate">Until date: </label>
        <input type="date"
          id="untilDate"
          value={quiz.untilDate.toISOString().split('T')[0]}
          onChange={(e) => setQuiz({...quiz, untilDate: new Date(e.target.value)})}
        />
      </div>
    </div>
    <div className="save-options">
      <button>Cancel</button>
      <button>Save and Publish</button>
      <button>Save</button>
    </div>
    </>
  )
}