import { Route, Routes } from "react-router-dom";
import { QuizList } from "./QuizList/QuizList";
import { QuizDetails } from "./QuizDetails/QuizDetails";
import { EditRoutes } from "./QuizEditor/EditRoutes";
import { CreateRoutes } from "./QuizEditor/CreateRoutes";
import { QuizPreview } from "./QuizPreview/QuizPreview";

export const Quizzes = () => {

  return(
    <Routes>
      {/* todo: make quiz index route, remove these from courselist */}
      <Route path="/" element={<QuizList />} />
      <Route path="/:quizId" element={<QuizDetails />} />
      <Route path="/:quizId/preview" element={<QuizPreview />} />
      <Route path="/:quizId/edit/*" element={<EditRoutes />} />
      <Route path="/create/*" element={<CreateRoutes />} />
  </Routes>
  )
}