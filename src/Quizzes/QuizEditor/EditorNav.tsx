import { Link, useLocation } from "react-router-dom";

export interface EditorNavProps {
  courseId?: string;
  quizId?: string;
}

function EditorNav(props: EditorNavProps) {
  const { courseId, quizId } = props;

  const linkPrefix = quizId ? `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit` : `/Kanbas/Courses/${courseId}/Quizzes/create`

  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link to={`${linkPrefix}/details`}
            className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>Details</Link>
      <Link className={`nav-link ${pathname.includes("questions") ? "active" : ""}`} 
            to={`${linkPrefix}/questions`}>Questions</Link>
    </nav>
  );
}


export default EditorNav;