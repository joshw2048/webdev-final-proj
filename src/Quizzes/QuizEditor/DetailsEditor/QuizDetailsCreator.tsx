// same as quiz details, just won't have an ID associated with it sooo
import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { Quiz, defaultQuizOptions } from "../../types";
import { DetailsEditor } from "./DetailsEditor";
import * as client from "../../client"

export const QuizDetailsCreator = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
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
      await client.createQuiz(quiz);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
    } catch (error) {
      alert("could not create quiz");
    }
  }

  const save = async () => {
    try {
      const test = await client.createQuiz(quiz);
      console.log(test, "do i get a quiz object back...")
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
    } catch (error) {
      alert("could not create quiz");
    }
    // todo: get quiz id upon post and navigate to quiz details
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