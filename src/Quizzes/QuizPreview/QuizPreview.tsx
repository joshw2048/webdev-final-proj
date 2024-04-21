import { useState } from "react";
import { Question } from "../types";
import { PreviewFillBlanks } from "./PreviewFillBlanks";
import { PreviewMC } from "./PreviewMC";
import { PreviewTrueFalse } from "./PreviewTrueFalse";


const renderQuestion = (question: Question, index: number) => {
  switch(question.type) {
    case "MultipleChoice": {
      return <PreviewMC question={question} questionNum={index} />
    }
    case "TrueFalse": {
      return <PreviewTrueFalse question={question} questionNum={index}/>
    }
    case "FillInBlank": {
      return <PreviewFillBlanks question={question} questionNum={index} />
    }
  }
}

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