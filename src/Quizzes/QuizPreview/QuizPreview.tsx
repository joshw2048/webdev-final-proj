import { useState } from "react";
import { Question } from "../types";

export const QuizPreview = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  return(
    <>
    <button>Previous</button>
    <button>Next</button>
    </>
  )
}