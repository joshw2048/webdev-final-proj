import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlane, FaPlusCircle, FaRegTimesCircle, FaPlus } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { quizArray } from "../exampleQuizzes";
import { Quiz } from "../types";
import { createAvailabilityText } from "../utils";
import { useState } from "react";
import './index.css';

export const QuizList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // TODO: Change this to use backend
  // when you change this to use the backend and get all quizzes for a course, you'll need to then take the quizId and get the number of questions from the questions collection
  const quizzesList: Quiz[] = quizArray.filter((quiz) => quiz.course === courseId);
  const [quizzes, setQuizzes] = useState<Quiz[]>(quizzesList);

  const togglePublishQuiz = (index: number, publishValue: boolean) => {
    const newQuizzes = [...quizzes];
    newQuizzes[index] = {...newQuizzes[index], published: publishValue};
    setQuizzes(newQuizzes);
    // todo: connect to backend (can just update the single quiz via id)
  }

  const deleteQuiz = (id: string | undefined) => {
    // backend connect
    setQuizzes([...quizzes.filter((quiz) => quiz._id !== id)])
  }


  return (
    <div className='assignments-container'>
      <div className="top-content">
        <input type="search" placeholder="Search for Quiz"/>
        <div className="button-group">
          <button 
            className="btn btn-danger"
            onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/create`)}
          >
            <FaPlus /> 
            Quiz
          </button>
          <button className="btn btn-light mx-2"><FaEllipsisV /></button> 
        </div>
      </div>
      <div className="assignments-wrapper">
        <hr />
        <ul className="list-group wd-modules">
          <li className="list-group-item list-header">
            <div>
              <FaEllipsisV className="me-2" /> 
              Assignment Quizzes
              <span className="float-end">
                <span className='percent-value'>40% of Total</span>
                <FaCheckCircle className="text-success" />
              </span>
            </div>
            <ul className="list-group">
              {quizzes.map((quiz, index) => (
                <li key={index} className="list-group-item">
                  <div style={{ display: 'flex', alignItems: 'center',}}>
                    <div className='assignment-item'>
                      <FaPlane className="me-2" />
                      <div>
                        <Link
                          to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                        >
                          {quiz.name}
                        </Link>
                        <div>
                          <span>{`${createAvailabilityText(quiz, numQuestions)}`}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {quiz.published === false ? 
                        <FaRegTimesCircle onClick={() => togglePublishQuiz(index, true)}/> : 
                        <FaCheckCircle onClick={() => togglePublishQuiz(index, false)} className="text-success" />}
                      <div className="dropdown mx-2" >
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <FaEllipsisV />
                        </button>
                        <div className="dropdown-menu border border-light" aria-labelledby="dropdownMenuButton">
                          <button
                            className="dropdown-item list-group-item p-1" 
                            onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit`)}
                          >
                            Edit
                          </button>
                          <button 
                            className="dropdown-item list-group-item p-1"
                            onClick={() => deleteQuiz(quiz._id)}
                          >
                            Delete
                          </button>
                          <button 
                            className="dropdown-item list-group-item p-1"
                            onClick={() => togglePublishQuiz(index, !quiz.published)}
                          >
                            {quiz.published === false ? `Publish` : `Unpublish`}
                          </button> 
                        </div>
                      </div>
                    </div>
                  </div>
                </li>))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}