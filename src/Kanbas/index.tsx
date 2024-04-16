import { useState, useEffect } from "react";
import axios from "axios";
import KanbasNavigation from "./Navigation";
import Account from "./Account";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { SmallNav } from "./Navigation/SmallNav";
import { useMediumMediaQueryBreakpoint } from "./hooks/useMediumMediaQueryBreakpoint";
import { Course } from "./types" 
import store from "./store";
import { Provider } from "react-redux";

const API_BASE = process.env.REACT_APP_API_BASE;
const api = axios.create({
  withCredentials: true
});

function Kanbas() {
  const isLargeScreen = useMediumMediaQueryBreakpoint();

  const [courses, setCourses] = useState<Course[]>([]);
  const COURSES_API = `${API_BASE}/api/courses`;
  const findAllCourses = async () => {
    const response = await api.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const [course, setCourse] = useState<Course>({
    id: `1234`,
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    image: "teslabot.jpg"  
  });
  const addNewCourse = async () => {
    const response = await api.post(COURSES_API, {...course, id: `${Math.random() * 1000000000}`});
    setCourses([ ...courses, response.data ]);
  };
  const deleteCourse = async (courseId: string) => {
    const response = await api.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter(
      (c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    const response = await api.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };

  return (
    <Provider store={store}>
      {!isLargeScreen && <SmallNav />}  
      <div className="d-flex">
        <div>
          {isLargeScreen && <KanbasNavigation />}
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/Account/*" element={<Account />} />
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
              />} 
            />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;