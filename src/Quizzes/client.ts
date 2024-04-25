import axios from "axios";
import { Quiz } from "./types";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;

const api = axios.create({
  withCredentials: true
});

export const updateQuiz = async (quiz: Quiz) => {
  const response = await api.put(`${QUIZZES_API}/${quiz._id ?? ''}`, quiz);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await api.get(`${QUIZZES_API}/courses/${courseId}`);
  return response.data;
};

export const createQuiz = async (quiz: Quiz) => {
  const response = await api.post(`${QUIZZES_API}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await api.delete(
    `${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizById = async (id: string) => {
  const url = `${QUIZZES_API}/${id}`
  const response = await api.get(`${QUIZZES_API}/${id}`);
  return response.data;
};

export const findAllQuestionsForQuiz = async (quizId: string) => {
  const response = await api.get(`${BASE_API}/api/courses/quizzes/${quizId}/questions`);
  return response.data;
}