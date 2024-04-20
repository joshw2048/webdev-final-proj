// same as quiz details, just won't have an ID associated with it sooo
import { useState } from "react"
import { Link, useParams } from "react-router-dom";
import { Quiz, defaultQuizOptions } from "../../types";
import { DetailsEditor } from "./DetailsEditor";

export const QuizDetailsCreator = () => {
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

  const saveAndPublish = (quiz: Quiz) => {
    console.log(quiz);
    console.log("saving and publishing")
  }

  const save = (quiz: Quiz) => {
    console.log(quiz);
    console.log("saving only")
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