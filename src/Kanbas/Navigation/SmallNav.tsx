import './small-nav.css';
import { useState } from 'react';
import { courses } from "../../Kanbas/Database";
import {
  useLocation,
  Link
} from "react-router-dom";
import { links } from './index';
import {
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaEmpire,
  FaEyeSlash,
  FaFile,
  FaHome,
  FaMicrophone,
  FaPaperclip,
  FaPlug,
  FaPlus,
  FaRegFile,
  FaRegFileAlt,
  FaRegUser,
} from "react-icons/fa";

const courseLinks = [
  { label: "Home", icon: <FaHome style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Modules", icon: <FaPaperclip style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Piazza", icon: <FaPlug style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Zoom Meetings", icon: <FaPlug style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Grades", icon: <FaFile style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Assignments", icon: <FaRegFileAlt style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Quizzes", icon: <FaFile style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Panopto Video", icon: <FaPlug style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Discussions", icon: <FaFile style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Announcements", icon: <FaMicrophone style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "Collaboratons", icon: <FaRegUser style={{ color: "#C8102E", marginRight: '2px' }} /> },
  { label: "People", icon: <FaRegUser style={{ color: "#C8102E", marginRight: '2px'}} />, secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2" /> },
  { label: "Files", icon: <FaFile style={{ color: "#C8102E", marginRight: '2px'}} />, secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2" /> },
  { label: "Rubrics", icon: <FaFile style={{ color: "#C8102E", marginRight: '2px'}} />, secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2" /> },
  { label: "Outcomes", icon: <FaPlus style={{ color: "#C8102E", marginRight: '2px'}} />, secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2" /> },
  { label: "Syllabus", icon: <FaRegFile style={{ color: "#C8102E", marginRight: '2px'}} />, secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2" /> },
  { label: "Settings", icon: <FaEmpire style={{ color: "#C8102E", marginRight: '2px'}} />, secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2" /> },
]

export const SmallNav = () => {

  const { pathname } = useLocation();
  const pathArray = pathname.includes("Courses") ? pathname.split('/') : [];
  const courseId = pathArray.length > 0 ? pathArray[pathArray.length - 2] : undefined;
  const page = pathArray.length > 0 ? pathArray[pathArray.length - 1] : undefined;
  const course = courses.find((course) => course._id === courseId);

  const [navOpen, setNavOpen] = useState(false);
  const [courseNavOpen, setCourseNavOpen] = useState(false);

  return (
    <>
      <div className='hamburger-nav'>
        <button
          className="icon-button"
          onClick={() => {
            setNavOpen(!navOpen)
            setCourseNavOpen(false);
          }}>
          <FaBars />
        </button>
        {courseId && <span>{course?.description} <FaChevronRight /> {page}</span>}
        {courseId &&
          <button
            className="icon-button"
            onClick={() => {
              setCourseNavOpen(!courseNavOpen)
              setNavOpen(false);
            }}
          >
            <FaChevronDown />
          </button>}
      </div>
      {navOpen && <div className='main-nav'>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>

        </div>
        <ul className="toggle-navigation">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={`/Kanbas/${link.label}`}
                onClick={() => {
                  setCourseNavOpen(false);
                  setNavOpen(false);
                }}
                style={{
                  color: "black"
                }}
              >
                {link.icon ? link.icon : null}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>}
      {courseNavOpen && courseId && <div className='course-nav'>
        <ul className="toggle-navigation">
          {courseLinks.map((link, index) => (
            <li key={index} style={{ color: '#C8102E' }}>
              <Link to={`/Kanbas/Courses/${courseId}/${link.label}`}
                onClick={() => {
                  setCourseNavOpen(false);
                  setNavOpen(false);
                }}
                style={{
                  color: "#C8102E"
                }}
              >
                {link.icon ? link.icon : null}
                {link.label}
                {link.secondaryIcon ? link.secondaryIcon : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>}
    </>
  );
}