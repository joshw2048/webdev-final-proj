import { FillInBlank, MultipleChoice, Question, TrueFalse } from "../types"

export interface PreviewProps {
  question: Question;
  questionNum: number;
}

const displayAnswers = (question: Question) => {
  switch(question.type) {
    case "MultipleChoice": {
      const q = question as MultipleChoice;
      const mcName = `${q.title}MC`
      return (
        <div className="list-group list-group-flush">
          {q.possibleAnswers.map((answer) => {
            return <div className="list-group-item" key={answer}> 
              <input name={mcName} type="radio" id={answer}/>
              <label className="px-2" htmlFor={answer}>{answer}</label>
            </div>
          })}
        </div>
      )
    }
    case "TrueFalse": {
      const q = question as TrueFalse;
      const trueFalseName = `${q.title}Question`
      const trueId = `${q.title}True`
      const falseId = `${q.title}False`
      return(
        <div className="list-group list-group-flush">
          <div className="list-group-item">
              <input type="radio" name={trueFalseName} id={trueId}/>
              <label className="px-2" htmlFor={trueId}>True</label>
          </div>
          <div className="list-group-item">
              <input type="radio" name={trueFalseName} id={falseId}/>
              <label className="px-2" htmlFor={falseId}>False</label>
          </div>
        </div>
      )
    }
    case "FillInBlank": {
      const q = question as FillInBlank;
      return (
        <div className="list-group list-group-flush">
          {q.correctAnswers.map((answer, index) => {
            return <div className="list-group-item" key={answer}> 
              <label className="px-2" htmlFor={answer}>{index + 1}.</label>
              <input type="text" id={answer}/>
            </div>
          })}
        </div>
      )
    }
  }
}

export const QuestionPreview = (props: PreviewProps) => {
  const { question, questionNum } = props;
  return(
    <div className="card">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <div>
            {question.title} - Question {`${questionNum + 1}`}
          </div>
          <div>
            {question.points} pts
          </div>
        </div>
      </div>
      <div className="card-body">
        <div>
          <div dangerouslySetInnerHTML={{ __html: question.question ?? "" }} />
        </div>
        <div>
          {displayAnswers(question)}
        </div>
      </div>
    </div>
  )
}