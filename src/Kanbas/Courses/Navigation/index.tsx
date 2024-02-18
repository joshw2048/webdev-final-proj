import { Link, useLocation } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import "./index.css"; 

function CourseNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Grades",
    "Assignments",
    "Quizzes",
    "Panopto Video",
    "Discussions",
    "Announcements",
    "Collaboratons",
    "People",
    "Files",
    "Rubrics",
    "Outcomes",
    "Syllabus",
    "Settings",
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}{index > 11 && <FaEyeSlash style={{ color: "darkGray" }} className="ms-2"/>}</Link>
        </li>
      ))}
    </ul>
  );
}

export default CourseNavigation;