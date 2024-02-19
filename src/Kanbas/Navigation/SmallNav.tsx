import './small-nav.css';
import { useState } from 'react';
import { courses } from "../../Kanbas/Database";
import { 
  useLocation,
  Link
} from "react-router-dom";
import { links } from './index';
import { FaBars, FaChevronDown, FaChevronRight, FaEyeSlash } from "react-icons/fa";

const courseLinks = [
  { label: "Home", },
  { label: "Modules", },
  { label: "Piazza", },
  { label: "Grades", },
  { label: "Assignments", },
  { label: "Quizzes", },
  { label: "Panopto Video", },
  { label: "Discussions", },
  { label: "Announcements", },
  { label: "Collaboratons", },
  { label: "People", secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2"/>},
  { label: "Files", secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2"/>},
  { label: "Rubrics", secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2"/>},
  { label: "Outcomes", secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2"/>},
  { label: "Syllabus", secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2"/>},
  { label: "Settings", secondaryIcon: <FaEyeSlash style={{ color: "darkGray" }} className="ms-2"/>},
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
        <div style={{ display: 'flex', flexDirection: 'row-reverse'}}>
          
        </div>
        <ul className="toggle-navigation">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={`/Kanbas/${link.label}`}
                onClick={() => {
                  setCourseNavOpen(false);
                  setNavOpen(false);
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
              >  
                {/* {link.icon ? link.icon : null}  */}
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