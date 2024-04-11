import './index.css';
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { Course } from "../types";

function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {
    
  return (
    <div className="p-4">
      <h1>Dashboard</h1>   
      <h5>Course</h5>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
      <input value={course.startDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
      <button className="course-button" onClick={addNewCourse} >
        Add
      </button>
      <button className="course-button" onClick={updateCourse} >
        Update
      </button>

      <hr />
      <h2>Published Courses ({courses.length})</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses && courses?.map((course: Course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <Link to={`/Kanbas/Courses/${course._id}/Home`} style={{ textDecoration: 'none' }}>
                  <img src={require(`../images/teslabot.jpg`)} className="card-img-top"
                      style={{ height: 150 }}/>
                  <div className="card-body">
                    <span 
                      className="card-title"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}
                    >
                      {course.name} 
                    </span>
                    {course.subtext && <p className="card-text">{course.subtext}</p>}
                    <div className='course-button-container'>
                      <FaBook />
                      <div>
                        <button className="course-button" onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}>
                          Edit
                        </button>
                        <button className="course-button" onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;