import { Question, MultipleChoice, TrueFalse, FillInBlank } from "../../types"

function QuestionBlock( question: any ) {
    return (
        <>
        <div className="border">
            <h3>{question.question}</h3>
            { (question as MultipleChoice).possibleAnswers !== undefined && (
                    (question as MultipleChoice).possibleAnswers.map((option) => (
                      <input type="radio" name={question.title}>{option}</input>
                    ))
                )
            }
            { (question as TrueFalse).correctAnswer !== undefined && (
                    <div>
                    <input value="true" type="radio">True</input>
                    <input value="false" type="radio">False</input>
                    </div>
                )
            }
            { (question as FillInBlank).correctAnswers !== undefined && (
                <>
                <input value="true" type="radio">True</input>
                <input value="false" type="radio">False</input>
                </>
            )
            }
        </div>
        </>
    )
}

export default QuestionBlock