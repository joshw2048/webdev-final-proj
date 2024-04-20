import { Route, Routes, Navigate, useParams } from "react-router-dom";
import EditorNav from "./EditorNav";
import { QuizDetailsEditor } from "./DetailsEditor/QuizDetailsEditor";

export const EditRoutes = () => {
  const { courseId, quizId } = useParams();
  return (
    <div>
      <EditorNav courseId={courseId} quizId={quizId}/>
      <Routes>
        <Route path="/" element={<Navigate to="details" />}/>
        <Route path="details" element={<QuizDetailsEditor />}/>
        <Route path="questions" element={<h1> josh edit questions of existing quiz here</h1>}/>
      </Routes>
    </div>
  )
}