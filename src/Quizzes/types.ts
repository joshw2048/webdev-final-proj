export type QuizType = "Graded Quiz" | "Practice Quiz" | "Graded Survey" | "Ungraded Survey"
export type AssignmentGroup = "Quizzes" | "Exams" | "Assignments" | "Project";

export interface BaseQuiz {
  quizType: QuizType;
  points: number;
  numQuestions: number,
  assignmentGroup: AssignmentGroup;
  shuffleAnswers: boolean;
  timeLimit?: number; // in minutes
  multipleAttempts: boolean;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableDate: Date;
  untilDate: Date;
  published: boolean;
  instructions: string;
}

type DefaultQuizOptions = Omit<BaseQuiz, "points" | "showCorrectAnswers" | "dueDate" | "availableDate" | "untilDate">;

export const defaultQuizOptions: DefaultQuizOptions = {
  quizType: "Graded Quiz",
  numQuestions: 0,
  assignmentGroup: "Quizzes",
  shuffleAnswers: true,
  timeLimit: 20,
  multipleAttempts: false,
  accessCode: "",
  oneQuestionAtTime: true,
  webcamRequired: false,
  lockQuestionsAfterAnswering: false,
  published: false,
  instructions: "",
}

type QuestionType = "MultipleChoice" | "TrueFalse" | "FillInBlank";

interface BaseQuestion {
  type: QuestionType;
  quiz: string
  title: string;
  points: number;
  question: string;
}

export interface MultipleChoice extends BaseQuestion {
  correctAnswer: string;
  possibleAnswers: string[];
}

export interface TrueFalse extends BaseQuestion {
  correctAnswer: boolean;
}

export interface FillInBlank extends BaseQuestion {
  correctAnswers: string[];
}

export type Question = MultipleChoice | TrueFalse | FillInBlank;

export interface Quiz extends BaseQuiz {
  _id?: string;
  name: string;
  course: string;
}