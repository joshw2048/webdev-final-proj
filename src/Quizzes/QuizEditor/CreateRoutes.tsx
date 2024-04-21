import { Route, Routes, Navigate, useParams } from "react-router-dom";
import EditorNav from "./EditorNav";
import { QuizDetailsCreator } from "./DetailsEditor/QuizDetailsCreator";
import QuizQuestionsEditor from "./QuestionsEditor/QuizQuestionsEditor";

export const CreateRoutes = () => {
  const { courseId } = useParams();

  return (
    <div>
      <EditorNav courseId={courseId} />
      <Routes>
        <Route path="/" element={<Navigate to="details" />}/>
        <Route path="details" element={<QuizDetailsCreator />}/>
        <Route path="questions" element={<QuizQuestionsEditor />}/>
      </Routes>
    </div>
  )
}