import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { Quiz, defaultQuizOptions } from "../../types";
import { DetailsEditor } from "./DetailsEditor";
import * as client from "../../client"

// todo: change this to have initial state of the quiz at this id
export const QuizDetailsEditor = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();

  // initial state will be us fetching the quiz
  const [quiz, setQuiz] = useState<Quiz>({
    ...defaultQuizOptions, 
    name: "Unnamed Quiz", 
    points: 0,
    showCorrectAnswers: false,
    availableDate: new Date(),
    dueDate: new Date(),
    untilDate: new Date(),
    course: courseId ?? '',
  });

  const saveAndPublish = async () => {
    try {
      await client.updateQuiz({...quiz, published: true});
      console.log("details editor save and publish", quiz)
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    } catch (error) {
      alert("could not update quiz");
    }
  }

  const save = async () => {
    try {
      await client.updateQuiz(quiz);
      console.log("details editor save", quiz)
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