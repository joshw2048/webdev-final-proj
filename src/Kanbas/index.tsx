import { useState, useEffect } from "react";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { SmallNav } from "./Navigation/SmallNav";
import { useMediumMediaQueryBreakpoint } from "./hooks/useMediumMediaQueryBreakpoint";
import { courses as dbCourses } from "./Database";
import { Course } from "./types" 
import store from "./store";
import { Provider } from "react-redux";

function Kanbas() {
  const isLargeScreen = useMediumMediaQueryBreakpoint();

  const [courses, setCourses] = useState<Course[]>(dbCourses);
  const [course, setCourse] = useState<Course>({
    _id: "1234", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    image: "teslabot.jpg"  
  });
  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
  };
  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
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
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
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
            <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;