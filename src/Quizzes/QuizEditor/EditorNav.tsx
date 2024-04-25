import { Link, useLocation, useNavigate } from "react-router-dom";

export interface EditorNavProps {
  courseId?: string;
  quizId?: string;
}

// function EditorNav(props: EditorNavProps) {
//   const { courseId, quizId } = props;

//   const linkPrefix = quizId ? `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit` : `/Kanbas/Courses/${courseId}/Quizzes/create`

//   const { pathname } = useLocation();
//   return (
//     <nav className="nav nav-tabs mt-2">
//       <Link to={`${linkPrefix}/details`}
//             className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>Details</Link>
//       <Link onClick={() => alert("Quiz must be created before questions can be edited") } to={`${linkPrefix}/details`}
//             className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>Questions</Link>
//     </nav>
//   );
// }


function EditorNav(props: EditorNavProps) {
  const { courseId, quizId } = props;
  const linkPrefix = quizId
    ? `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`
    : `/Kanbas/Courses/${courseId}/Quizzes/create`;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleQuestionsLinkClick = () => {
    if (!quizId) {
      alert("Quiz must be created before questions can be edited");
      navigate(`${linkPrefix}/details`);
    } else {
      navigate(`${linkPrefix}/questions`);
    }
  };

  return (
    <nav className="nav nav-tabs mt-2">
      <Link
        to={`${linkPrefix}/details`}
        className={`nav-link ${pathname.includes("details") ? "active" : ""}`}
      >
        Details
      </Link>
      <span
        onClick={handleQuestionsLinkClick}
        className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}
      >
        Questions
      </span>
    </nav>
  );
}

export default EditorNav;