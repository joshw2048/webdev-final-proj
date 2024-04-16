import { Quiz } from "./types";

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