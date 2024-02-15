import './index.css';
import { courses } from "../../Kanbas/Database";
import { useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";

function Courses() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  return (
    <div className='course-container'>
      <h1><HiMiniBars3 /> Course {course?.name}</h1>
      <hr id='grey' />
    </div>
  );
}

export default Courses;

