import './index.css';
import { useState, useEffect } from "react";
import axios from "axios";
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
import { useMediumMediaQueryBreakpoint } from '../hooks/useMediumMediaQueryBreakpoint';
import { Quizzes } from '../../Quizzes';

const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
  const { courseId } = useParams();
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);
  const { pathname } = useLocation();
  const pathArray = pathname.split('/');
  const page = pathArray[pathArray.length - 1];
  const isLargeScreen = useMediumMediaQueryBreakpoint();

  return (
    <div className='course-container'>
      {isLargeScreen && <h1><span><HiMiniBars3 /> Course {course?.name}</span> <FaChevronRight /> {page}</h1> }
      {isLargeScreen && <hr id='grey' /> }
      <span>{course?.description}</span>
      <div className='course-wrapper'>
        {isLargeScreen && <CourseNavigation /> }
        <div className='course-content'>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="Quizzes/*" element={<Quizzes />} />
          </Routes>
        </div>
      </div>

    </div>
  );
}

export default Courses;

