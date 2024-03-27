import "./index.css";
import ModuleList from "../Modules/List";
import { 
  FaBan, 
  FaCheckCircle, 
  FaCloudUploadAlt, 
  FaBullseye, 
  FaCalendarWeek, 
  FaBullhorn, 
  FaFileUpload 
} from "react-icons/fa";

function Home() {
  return (
    <div className='home-container'>
      <div className='flex-fill'>
        <ModuleList />
      </div>
      <div className='flex-grow-0 me-2 d-none d-lg-block px-2' style={{ width: '250px' }}>
        <div className="status-container">
          <h5>Course Status</h5>
          <div>
            <button className="button"><FaBan /> Unpublish</button>
            <button className="published-button button"><FaCheckCircle />Published</button>
          </div>
          <ul className="list-group">
            <li className="course-list"><FaCloudUploadAlt style={{ margin: '0px 3px' }} /><a href="#">Import Existing Content</a></li>
            <li className="course-list"><FaFileUpload style={{ margin: '0px 3px' }} /><a href="#">Import From Commons</a></li>
            <li className="course-list"><FaBullseye style={{ margin: '0px 3px' }} /><a href="#">Choose Home Page</a></li>
            <li className="course-list"><FaBullseye style={{ margin: '0px 3px' }} /><a href="#">View Course Stream</a></li>
            <li className="course-list"><FaBullhorn style={{ margin: '0px 3px' }} /><a href="#">New Announcement</a></li>
            <li className="course-list"><FaBullseye style={{ margin: '0px 3px' }} /><a href="#">New Analytics</a></li>
            <li className="course-list"><FaBullseye style={{ margin: '0px 3px' }} /><a href="#">View Course Notifications</a></li>
          </ul>
          <div className="heading-container">
            <h5 >Coming Up</h5>
            <a style={{ color: "red" }} href="#">View Calendar</a>
          </div>
          <hr />
          <ul>
            <li className="todo-list">
              <a href="#">
                <div style={{ display: 'flex', gap: '10px'}}>
                  <FaCalendarWeek className="dark-gray"/>
                  <div style={{ display: "flex", flexDirection: 'column'}}>
                    <span style={{ color: "red" }}>Lecture</span>
                    <span className="dark-gray">CS4550.12631.202410</span>
                    <span className="dark-gray">Sep 7 at 11:45am</span>
                  </div> 
                </div>
              </a>
            </li>
            <li className="todo-list"><a href="#">
              <div style={{ display: 'flex', gap: '10px'}}>
                <FaCalendarWeek className="dark-gray"/>
                <div style={{ display: "flex", flexDirection: 'column'}}>
                  <span style={{ color: "red" }}>Lecture</span>
                  <span className="dark-gray">CS4550.12631.202410</span>
                  <span className="dark-gray">Sep 7 at 11:45am</span>
                </div> 
              </div>
            </a></li>
            <li className="todo-list"><a href="#"> 
              <div style={{ display: 'flex', gap: '10px'}}>
                <FaCalendarWeek className="dark-gray"/>
                <div style={{ display: "flex", flexDirection: 'column'}}>
                  <span style={{ color: "red" }}>Lecture</span>
                  <span className="dark-gray">CS4550.12631.202410</span>
                  <span className="dark-gray">Sep 7 at 11:45am</span>
                </div> 
              </div>
            </a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Home;