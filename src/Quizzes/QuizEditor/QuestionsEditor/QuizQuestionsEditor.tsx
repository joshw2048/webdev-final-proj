// same as quiz details, just won't have an ID associated with it sooo

import React, { useEffect, useState } from 'react';
import { Question } from '../../types';
import { MultipleChoice, TrueFalse, FillInBlank } from '../../types';
import { defaultMCAnswers, getFIBChoices, getQuestionType, jsonToQuestions, questionsToJson } from '../../utils';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const QuizQuestionsEditor = () => {
  const API_BASE = process.env.REACT_APP_API_BASE;
  const api = axios.create({
    withCredentials: true
  });
  
  const QUIZZES_API = `${API_BASE}/api/courses`;
  const location = useLocation();
  const pathParts = location.pathname.split('/'); 
  const quizIndex = pathParts.indexOf('Quizzes');
  const courseIndex = pathParts.indexOf('Courses');
  const courseId = pathParts[courseIndex + 1];
  const quizId = pathParts[quizIndex + 1];
  let dbQuestions: Question[] = [];

  const findAllQuestions = async () => {
    const response = await api.get(`${QUIZZES_API}/quizzes/${quizId}/questions`);
    dbQuestions = jsonToQuestions(response.data.questions);
    const totalPoints = dbQuestions.reduce((total, question) => {
      return total + question.points;
    }, 0);
    setTotalPoints(totalPoints);
    setQuestions(dbQuestions);
  };
  useEffect(() => {
    findAllQuestions();
  }, []);
  
  const [questions, setQuestions] = useState<Question[]>([]);

  const defaultQuestion: MultipleChoice = {
    title: "Q" + (questions.length + 1),
    type: "MultipleChoice",
    quiz: '',
    points: 4,
    question: 'New question',
    correctAnswer: "Example 1",
    possibleAnswers: ['Example 1', 'Example 2', 'Example 3', 'Example 4']
  };

  const [editingQuestion, setEditingQuestion] = useState<any>(defaultQuestion);
  const [title, setTitle] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [displayEditingQuestion, setDisplayEditingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState(false);
  const [questionContent, setQuestionContent] = useState('');
  const [points, setPoints] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [MCEditingOption, setMCEditingOption] = useState('');
  const [editingPossibleAnswers, setEditingPossibleAnswers] = useState<string[]>([]);
  const [editingCorrectAnswers, setEditingCorrectAnswers] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [newOptionCount, setNewOptionCount] = useState(1);

  const navigate = useNavigate();


  const handleNewQuestion = () => {
    setQuestionType('multiple-choice');
    setTitle(defaultQuestion.title);
    setPoints(defaultQuestion.points);
    setQuestionContent(defaultQuestion.question);
    setPossibleAnswers(defaultQuestion.possibleAnswers);
    setCorrectAnswers(["Example 1", "Example 2", "Example 3", "Example 4"]);
    setNewQuestion(true);
    setEditingQuestion(defaultQuestion);
    setDisplayEditingQuestion(true);
  };

  const handleChangeMCOption = (e: any, editingQuestion: MultipleChoice) => {
    const currPossibleAnswers = editingQuestion.possibleAnswers;
    const newAnswers = currPossibleAnswers.map(item => item !== MCEditingOption ? item : e.target.value);
    setMCEditingOption(e.target.value);
    editingQuestion.possibleAnswers = newAnswers;
    setPossibleAnswers(newAnswers);
  }

  const handleEditQuestion = (question: any) => {
    setQuestions(questions.filter((qs) => qs.title !== question.title));
    setTitle(question.title);
    setQuestionContent(question.question);
    setPoints(question.points);
    setTotalPoints(totalPoints - question.points);
    setEditingQuestion(question);
    setDisplayEditingQuestion(true);
    setPossibleAnswers((question as MultipleChoice).possibleAnswers);
    setEditingPossibleAnswers((question as MultipleChoice).possibleAnswers);
    setCorrectAnswers((question as FillInBlank).correctAnswers);
    setEditingCorrectAnswers((question as FillInBlank).correctAnswers);
    setNewQuestion(false);
    setQuestionType(getQuestionType(question));
  };

  const handleCancelEdit = (question: Question) => {
    if (question.type === 'MultipleChoice') {
      (question as MultipleChoice).possibleAnswers = editingPossibleAnswers;
    }
    if (question.type === 'FillInBlank') {
      (question as FillInBlank).correctAnswers = editingCorrectAnswers;
    }
    if (!newQuestion) {
      setQuestions([...questions, question]);
    }
    setTotalPoints(totalPoints + question.points);
    setEditingQuestion(defaultQuestion);
    setDisplayEditingQuestion(false);
  };

  const handleSaveQuestion = () => {
    if (questionType === 'multiple-choice') {
      let updatedQuestion: MultipleChoice = {
        title: title,
        type: "MultipleChoice",
        quiz: quizId,
        points: points,
        question: questionContent,
        correctAnswer: correctAnswer,
        possibleAnswers: possibleAnswers
      }
      console.log(updatedQuestion)
      setQuestions([...questions, updatedQuestion]);
      }
    else if (questionType === 'true-false') {
      let updatedQuestion: TrueFalse = {
        title: title,
        type: "TrueFalse",
        quiz: quizId,
        points: points,
        question: questionContent,
        correctAnswer: Boolean(correctAnswer),
      }
      setQuestions([...questions, updatedQuestion]);
    } else {
      let updatedQuestion: FillInBlank = {
        title: title,
        type: "FillInBlank",
        quiz: quizId,
        points: points,
        question: questionContent,
        correctAnswers: correctAnswers,
      }
      setQuestions([...questions, updatedQuestion]);
    }

    setQuestionContent('');
    setTotalPoints(totalPoints + points);
    setPoints(0);
    setCorrectAnswer('');
    setPossibleAnswers([]);
    setCorrectAnswers([]);
    setEditingQuestion(defaultQuestion);
    setDisplayEditingQuestion(false);
  };

  const handleMCRemoveOption = (optionToRemove: string) => {
    console.log(optionToRemove);
    const updatedPossibleAnswers = (editingQuestion as MultipleChoice).possibleAnswers.filter(
      (option) => option !== optionToRemove
    );
    const updatedEditingQuestion = { ...(editingQuestion as MultipleChoice), possibleAnswers: updatedPossibleAnswers };
    setEditingQuestion(updatedEditingQuestion);
    setPossibleAnswers(updatedPossibleAnswers);
  }

  const handleFIBRemoveOption = (optionToRemove: string) => {
    console.log(optionToRemove);
    const updatedCorrectAnswers = (editingQuestion as FillInBlank).correctAnswers.filter(
      (option) => option !== optionToRemove
    );
    const updatedEditingQuestion = { ...(editingQuestion as FillInBlank), correctAnswers: updatedCorrectAnswers };
    setEditingQuestion(updatedEditingQuestion);
    setCorrectAnswers(updatedCorrectAnswers);
  }

  const handleFIBAddOption = () => {
    const newOption = 'New Option ' + newOptionCount;
    console.log((editingQuestion as FillInBlank).correctAnswers);
    const updatedCorrectAnswers = [...(editingQuestion as FillInBlank).correctAnswers, newOption];
    const updatedEditingQuestion = { ...(editingQuestion as FillInBlank), correctAnswers: updatedCorrectAnswers };
    setNewOptionCount(newOptionCount + 1);
    setEditingQuestion(updatedEditingQuestion);
    setCorrectAnswers(updatedCorrectAnswers);
  };

  const handleMCAddOption = () => {
    const newOption = 'New Option ' + newOptionCount;
    const updatedPossibleAnswers = [...(editingQuestion as MultipleChoice).possibleAnswers, newOption];
    const updatedEditingQuestion = { ...(editingQuestion as MultipleChoice), possibleAnswers: updatedPossibleAnswers };
    setNewOptionCount(newOptionCount + 1);
    setEditingQuestion(updatedEditingQuestion);
    setPossibleAnswers(updatedPossibleAnswers);
  };

  const handleFIBOptionChange = (e: any, optionValue: string, currCorrectAnswers: string[]) => {
    setCorrectAnswers(currCorrectAnswers);
    const newCorrectAnswers = [...correctAnswers];
    const index = newCorrectAnswers.indexOf(optionValue);
    if (index !== -1) {
      newCorrectAnswers[index] = e.target.value;
      setCorrectAnswers(newCorrectAnswers);
    };
    console.log(correctAnswers);
  };

  const handleChangeQuestionType = (e: any) => {
    const type = e.target.value; 
    if (type === 'multiple-choice') {
      setPossibleAnswers(["Example 1", "Example 2", "Example 3", "Example 4"]);
    } else if (type === 'true-false') {

    } else if (type === 'fill-blanks') {
      setCorrectAnswers(["Example 1", "Example 2", "Example 3", "Example 4"]);
      setEditingQuestion({ ...(editingQuestion as FillInBlank), correctAnswers: ["Example 1", "Example 2", "Example 3", "Example 4"] });
    }
    setQuestionType(e.target.value);
  }

  const handlePublishQuiz = async () => {
    handleSaveQuiz(); 
    const response = await api.put(`${QUIZZES_API}/quizzes/${quizId}/updateQuizPublish`);
  };

  const handleSaveQuiz = async () => {
    const jsonQuestions = questionsToJson(questions);
    console.log(`${QUIZZES_API}/quizzes/${quizId}/questions`);
    const response1 = await api.post(`${QUIZZES_API}/quizzes/${quizId}/questions`, jsonQuestions);

    const jsonDetails = {points: totalPoints, numQuestions: questions.length};
    const response2 = await api.put(`${QUIZZES_API}/quizzes/${quizId}/updatePointsAndNumQuestions`, jsonDetails);

    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
  };

  return (
    <>
      <div>
      <h1>Quiz Questions</h1>
      { (questions.length === 0) && (
        <h3>No questions added yet.</h3>
      )} 
        {questions.map((question: Question) => (
          <div> <br />
            <div className="border">
              <h3>{question.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: question.question }} />              
              <p>Weight: {question.points} points</p>
              { question.type === "MultipleChoice" && (
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
              { question.type === "TrueFalse" && (
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
              { question.type === "FillInBlank" && (
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

        {displayEditingQuestion === true && (
          <div className="border">
            <h3>Edit Question {(editingQuestion as Question).title}</h3>
            <label>
              Title: 
              <input type="text" defaultValue={(editingQuestion as Question).title} onChange={(e) => setTitle(e.target.value)}></input>
            </label> <br />
            <div>
              <select
                value={questionType}
                onChange={(e) => handleChangeQuestionType(e)}>
                <option value="true-false">True False</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="fill-blanks">Fill in Blank</option>
              </select> <br /> <br />
            </div>
            <label>
              Question: 
              <Editor 
                apiKey="kzaz9q6p91bsbhvej8056yz0r9mtzu36bihtmfwfvcxbyxqx"
                onEditorChange={(newValue, _) => {
                  console.log(newValue);
                  console.log(_)
                  setQuestionContent(newValue);
                }}
                value={questionContent}
              />
            </label> <br />
            <label>
              Number of points: 
              <input type="number" defaultValue={(editingQuestion as Question).points} onChange={(e) => setPoints(parseInt(e.target.value))}></input>
            </label> <br />
            <label>
              Select correct answer: 
            </label>
            { questionType === 'multiple-choice' && (
              <div>
                <ul className="list-unstyled">
                  {defaultMCAnswers(editingQuestion as Question).map((option) => (
                    <li> 
                      <label>
                        <input type="radio" name={(editingQuestion as MultipleChoice).title} value={option} onChange={(e) => setCorrectAnswer(e.target.value)}/>
                        <input type="text" defaultValue={option} onClick={(e) => setMCEditingOption((e.target as HTMLInputElement).value)} onChange={(e) => handleChangeMCOption(e, editingQuestion)}></input>
                        <button onClick={() => handleMCRemoveOption(option)}>Remove option</button>
                      </label>
                    </li>
                  ))}
                </ul>
                <button onClick={handleMCAddOption}>Add option</button>
              </div>
            )}            
            { questionType === 'true-false' && (
              <div>
                <label>
                  <input value="true" type="radio" name={(editingQuestion as Question).title} onChange={(e) => setCorrectAnswer(e.target.value)}></input>
                  True
                </label> <br />
                <label>
                  <input value="false" type="radio" name={(editingQuestion as Question).title} onChange={(e) => setCorrectAnswer(e.target.value)}></input>
                  False
                </label>
                <br/>                    
              </div> 
            )}  
            { questionType === 'fill-blanks' && (
              <div>
                <ul className="list-unstyled">
                  {getFIBChoices((editingQuestion as Question)).map((option) => (
                    <li>
                      <label>
                        <input type="text" defaultValue={option} onChange={(e) => handleFIBOptionChange(e, option, (editingQuestion as FillInBlank).correctAnswers)}></input>
                        <button onClick={() => handleFIBRemoveOption(option)}>Remove option</button>
                      </label>
                    </li>
                  ))}
                </ul>
                <button onClick={handleFIBAddOption}>Add option</button>
              </div>
            )}
            <button onClick={() => handleCancelEdit(editingQuestion as Question)}>Cancel</button>
            <button onClick={handleSaveQuestion}>Save</button>
          </div>
          )
        }
    </div>

    <br/>
      <button onClick={handleNewQuestion}>New Question</button>
      <button onClick={handleSaveQuiz}>Save</button>
      <button onClick={handlePublishQuiz}>Save &amp; Publish</button>
    </>
  );
};


export default QuizQuestionsEditor;