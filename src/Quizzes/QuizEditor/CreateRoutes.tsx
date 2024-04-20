import { Route, Routes, Navigate, useParams } from "react-router-dom";
import EditorNav from "./EditorNav";
import { QuizDetailsCreator } from "./DetailsEditor/QuizDetailsCreator";

export const CreateRoutes = () => {
  const { courseId } = useParams();

  return (
    <div>
      <EditorNav courseId={courseId} />
      <Routes>
        <Route path="/" element={<Navigate to="details" />}/>
        <Route path="details" element={<QuizDetailsCreator />}/>
        <Route path="questions" element={<h1> josh create questions here</h1>}/>
      </Routes>
    </div>
  )
}