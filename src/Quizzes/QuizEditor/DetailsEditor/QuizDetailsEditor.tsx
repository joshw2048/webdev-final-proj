import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { Quiz, defaultQuizOptions } from "../../types";
import { DetailsEditor } from "./DetailsEditor";
import * as client from "../../client"
import { quizArray } from "../../exampleQuizzes";

// todo: change this to have initial state of the quiz at this id
export const QuizDetailsEditor = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>(quizArray[0]);

  const findQuiz = async () => {
    const q = await client.findQuizById(quizId ?? '1');
    const parsedDatesQuiz: Quiz = {
      ...q,
      availableDate: new Date(q.availableDate),
      untilDate: new Date(q.untilDate),
      dueDate: new Date(q.dueDate),
    }
    setQuiz(parsedDatesQuiz);
  }

  useEffect(() => {
    findQuiz();
  }, []);

  const saveAndPublish = async () => {
    try {
      await client.updateQuiz({...quiz, published: true});
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    } catch (error) {
      alert("could not update quiz");
    }
  }

  const save = async () => {
    try {
      await client.updateQuiz(quiz);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
    } catch (error) {
      alert("could not update quiz");
    }
  }

  return(
    <DetailsEditor 
      quiz={quiz}
      setQuiz={setQuiz}
      saveAndPublish={saveAndPublish}
      save={save}
    />
  );
  
}