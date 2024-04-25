import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlane, FaPlusCircle, FaRegTimesCircle, FaPlus } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { quizArray } from "../exampleQuizzes";
import { Quiz } from "../types";
import { createAvailabilityText } from "../utils";
import { useState, useEffect } from "react";
import * as client from "../client"
import './index.css';

export const QuizList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // determine if will need to get quizzes' questions/points too
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const findAllQuestionsForQuiz = async () => {
    const quizList = await client.findQuizzesForCourse(courseId ?? '1');
    setQuizzes(quizList as Quiz[]);
  }

  useEffect(() => {
    findAllQuestionsForQuiz();
  }, []);

  const togglePublishQuiz = async (index: number, publishValue: boolean) => {
    try {
      const newQuizzes = [...quizzes];
      const newQuiz = {...newQuizzes[index], published: publishValue};
      newQuizzes[index] = newQuiz;
      await client.updateQuiz(newQuiz)
      setQuizzes(newQuizzes);
    } catch (error) {
      alert("could not update quiz")
    }
  }

  const deleteQuiz = async (id: string | undefined) => {
    try {
      await client.deleteQuiz(id ?? "1")
      setQuizzes([...quizzes.filter((quiz) => quiz._id !== id)])
    } catch {
      alert("Error deleting quiz");
    }
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
                          <span>{`${createAvailabilityText(quiz)}`}</span>
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