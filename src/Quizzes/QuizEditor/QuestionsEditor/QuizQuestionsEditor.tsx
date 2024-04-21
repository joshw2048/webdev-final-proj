// same as quiz details, just won't have an ID associated with it sooo

import React, { useState } from 'react';
import { Question } from '../../types';
import { MultipleChoice, TrueFalse, FillInBlank } from '../../types';

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
  const [questionType, setQuestionType] = useState('multiple-choice');

  const handleNewQuestion = () => {
    // const newQuestion = {
    //   id: questions.length + 1,
    //   type: questionType,
    //   content: '',
    //   options: [],
    //   answer: '',
    // };
    // setQuestions([...questions, newQuestion]);
    // setEditingQuestion(newQuestion);
    console.log(questions[0].constructor.name);
  };

  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (updatedQuestion: any) => {
    const updatedQuestions = questions.map((q: any) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
    setEditingQuestion(null);
  };

  const handlePublishQuiz = () => {
    // Implement logic to publish the quiz
  };

  return (
    <>
      <div>
      <h1>Quiz Questions</h1>
      {/* <table className="w-100">
        <thead>
          <tr>
            <th>Question</th>
            <th>Points</th>
            <th>Options</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody> */}
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
          ))}
    </div>

    <br/>
      <button onClick={handleNewQuestion}>New Question</button>
      <select
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
      >
        <option value="true-false">True/False</option>
        <option value="multiple-choice">Multiple Choice</option>
        <option value="fill-blanks">Fill in Multiple Blanks</option>
      </select>

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