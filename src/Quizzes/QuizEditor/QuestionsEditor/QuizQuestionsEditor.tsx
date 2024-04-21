// same as quiz details, just won't have an ID associated with it sooo

import React, { useState } from 'react';
import { Question } from '../../types';
import { MultipleChoice, TrueFalse, FillInBlank } from '../../types';
import { defaultFIBAnswers, defaultMCAnswers, getQuestionType } from '../../utils';

// temporary questions before we put stuff in the database
let mc: MultipleChoice = {
  title: "Q1",
  points: 4,
  question: "What is the capital of France?",
  correctAnswer: "Paris",
  possibleAnswers: ["London", "Paris", "Berlin", "Rome"]
}
let tf: TrueFalse = {
  title: "Q2",
  points: 4,
  question: "The Earth is flat.",
  correctAnswer: false,
}
let fib: FillInBlank = {
  title: "Q3",
  points: 4,
  question: "What is the capital of The United States?",
  correctAnswers: ["DC", "Washington DC", "Washington D.C."],
}
const sampleQuestions = [mc, tf, fib];


const QuizQuestionsEditor = () => {
  const [questions, setQuestions] = useState(sampleQuestions);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionType, setQuestionType] = useState('');

  const handleNewQuestion = () => {
    const newQuestion: MultipleChoice = {
      title: "Q" + (questions.length + 1),
      points: 4,
      question: 'New question',
      correctAnswer: "Example 1",
      possibleAnswers: ['Example 1', 'Example 2', 'Example 3', 'Example 4']
    };
    setQuestions([...questions, newQuestion]);
    // setEditingQuestion(newQuestion as Question);
  };

  const handleEditQuestion = (question: any) => {
    setQuestions(questions.filter((qs) => qs.title !== question.title))
    setEditingQuestion(question);
    setQuestionType(getQuestionType(question));
  };

  const handleCancelEdit = (question: any) => {
    setQuestions([...questions, question]);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (updatedQuestion: any) => {
    const updatedQuestions = questions.map((q: any) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions([...questions, updatedQuestion]);
    setEditingQuestion(null);
  };

  const handlePublishQuiz = () => {
    // Implement logic to publish the quiz
  };

  return (
    <>
      <div>
      <h1>Quiz Questions</h1>
        {questions.map((question: Question) => (
          <div> <br />
            <div className="border">
              <h3>{question.title}</h3>
              <p className="fw-bold">{question.question}</p>
              { (question as MultipleChoice).possibleAnswers !== undefined && (
                <ul className="list-unstyled">
                  {(question as MultipleChoice).possibleAnswers.map((option) => (
                    <li>
                      <label>
                        <input type="radio" name={question.title} value={option} />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
                )}
              { (question as TrueFalse).correctAnswer !== undefined && (question as MultipleChoice).possibleAnswers === undefined && (
                  <div>
                  <label>
                    <input value="true" type="radio" name={question.title}></input>
                    True
                  </label> <br />
                  <label>
                    <input value="false" type="radio" name={question.title}></input>
                    False
                  </label>
                  <br/>                    
                  </div> 
                  )
              }
              { (question as FillInBlank).correctAnswers !== undefined && (
                <div>
                <input type="textarea"></input>
                <br/>
                </div>
                )
              }
              <br/>
                <button onClick={() => handleEditQuestion(question)}>
                    Edit
                </button>
              </div>
            </div>
        ))} <br />

        {editingQuestion !== null && (
          <div className="border">
            <h3>Edit Question {(editingQuestion as Question).title}</h3>
            <div>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}>
                <option value="true-false">True False</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="fill-blanks">Fill in Blank</option>
              </select> <br /> <br />
            </div>
            <label>
              Question: 
              <input type="text" defaultValue={(editingQuestion as Question).question}></input>
            </label> <br />
            <label>
              Select correct answer: 
            </label>
            { questionType === 'multiple-choice' && (
                <ul className="list-unstyled">
                  {defaultMCAnswers(editingQuestion).map((option) => (
                    <li>
                      <label>
                        <input type="radio" name={(editingQuestion as MultipleChoice).title} value={option} />
                        <input type="text" defaultValue={option}></input>
                      </label>
                    </li>
                  ))}
                </ul>
            )}            
            { questionType === 'true-false' && (
              <div>
                <label>
                  <input value="true" type="radio" name={(editingQuestion as Question).title}></input>
                  True
                </label> <br />
                <label>
                  <input value="false" type="radio" name={(editingQuestion as Question).title}></input>
                  False
                </label>
                <br/>                    
              </div> 
            )}  
            { questionType === 'fill-blanks' && (
              <div>
                <p className='fw-bold'>Please separate answers by a comma and space</p>
                <input type="text" defaultValue={defaultFIBAnswers(editingQuestion)}></input>
                <br/>
              </div>
            )}
            <button onClick={() => handleCancelEdit(editingQuestion)}>Cancel</button>
            <button onClick={handleSaveQuestion}>Save</button>
          </div>
          )
        }
    </div>

    <br/>
      <button onClick={handleNewQuestion}>New Question</button>

      <button onClick={handlePublishQuiz}>Save &amp; Publish</button>
    </>
  );
};

const QuestionEditor = () => {
  // Implement question editor component
  // { question, onCancel, onSave }
  return <div>Question Editor</div>;
};

export default QuizQuestionsEditor;