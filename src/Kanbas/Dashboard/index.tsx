import { Link } from "react-router-dom";
import { courses } from "../Database";

interface Course {
  _id: string;
  name: string;
  number: string;
  description?: string
  startDate: string;
  endDate: string;
  image: string;
}

function Dashboard() {
  
  return (
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <h2>Published Courses (3)</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {(courses as Course[]).map((course: Course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                <Link to={`/Kanbas/Courses/${course._id}/Home`} style={{ textDecoration: 'none' }}>
                  <img src={require(`../images/${course.image}`)} className="card-img-top"
                      style={{ height: 150 }}/>
                  <div className="card-body">
                    <span 
                      className="card-title"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}
                    >
                      {course.name} 
                    </span>
                    <p className="card-text">{course.description}</p>
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