import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { Quiz, defaultQuizOptions } from "../../types";
import { DetailsEditor } from "./DetailsEditor";


// todo: change this to have initial state of the quiz at this id
export const QuizDetailsEditor = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  console.log("do we ever get to the details editor btw")

  // initial state will be us fetching the quiz
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

  const saveAndPublish = (quiz: Quiz) => {
    console.log(quiz);
    console.log("saving and publishing")
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  }

  const save = (quiz: Quiz) => {
    console.log(quiz);
    console.log("saving only")
    // todo: get quiz id upon post and navigate to quiz details
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
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