import { FillInBlank, MultipleChoice, Question, Quiz, TrueFalse } from "./types";

export const translateBooleanToStringValue = (bool: boolean) => bool ? "Yes" : "No";

export const createAvailabilityText = (quiz: Quiz) => {
  const currentDate = new Date();
  const { untilDate, availableDate, dueDate, points, questions } = quiz;
  let availabilityString;

  if (currentDate > untilDate) {
    availabilityString = "Closed";
  } else if (currentDate < availableDate) {
    availabilityString = `Not available until ${availableDate.toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})}`;
  } else {
    availabilityString = "Available";
  }

  const dueString = ` | Due ${dueDate.toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric'})} | ${points} pts | ${questions.length} Questions`;

  return availabilityString + dueString;
}

export const parseFIBAnswers = (answers: String) => {
  return answers.split(", ");
}

export const defaultFIBAnswers = (question: Question) => {
  if ((question as FillInBlank).correctAnswers === undefined) {
    return "Example 1, Example 2"
  } else {
    const correctAnswers = (question as FillInBlank).correctAnswers;
    return correctAnswers.join(', ');
  }
}

export const getQuestionType = (question: Question) => {
  if ((question as TrueFalse).correctAnswer !== undefined && (question as MultipleChoice).possibleAnswers === undefined) {
    return 'true-false';
  } else if ((question as MultipleChoice).possibleAnswers !== undefined) {
    return 'multiple-choice';
  } else {
    return 'fill-blanks';
  }
}

export const defaultMCAnswers = (question: Question) => {
  if ((question as MultipleChoice).possibleAnswers === undefined) {
    return ["Example 1", "Example 2", "Example 3", "Example 4"];
  } else {
    return (question as MultipleChoice).possibleAnswers;
  }
}

export const getFIBChoices = (question: Question) => {
  if ((question as FillInBlank).correctAnswers === undefined) {
    return ["Example 1", "Example 2", "Example 3", "Example 4"];
  } else {
    return (question as FillInBlank).correctAnswers;
  }
}