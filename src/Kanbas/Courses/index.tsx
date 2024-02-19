import './index.css';
import { courses } from "../../Kanbas/Database";
import { useState, useEffect } from 'react';
import { 
  Navigate, 
  Route, 
  Routes, 
  useLocation, 
  useParams 
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";

function Courses() {
  // could also make custom react hook for this
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const { pathname } = useLocation();
  const pathArray = pathname.split('/');
  const page = pathArray[pathArray.length - 1];

  // could make custom react hook for this
  const [largeScreen, setLargeScreen] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setLargeScreen( e.matches ));
  }, []);

  return (
    <div className='course-container'>
      {largeScreen && <h1><span><HiMiniBars3 /> Course {course?.name}</span> <FaChevronRight /> {page}</h1> }
      {largeScreen && <hr id='grey' /> }
      <span>{course?.description}</span>
      <div className='course-wrapper'>
        {largeScreen && <CourseNavigation /> }
        <div className='course-content'>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default Courses;

