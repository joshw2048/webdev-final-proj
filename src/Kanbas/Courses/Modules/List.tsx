import "./index.css";
import { modules } from "../../Database";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { ListItem } from "./ListItem";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  return (
    <div className="module-wrapper">
      <div className="top-content-container">
        <button className="button">Collapse All</button>
        <button className="button">View Progress</button>
        <select className="select" id="select-publish">
          <option selected value="ALL">Publish All</option>
        </select>
        <button className="module-button button"><FaPlus /> Modules</button>
      </div>
      {modulesList.length > 0 ? 
        <ul className="list-group wd-modules list-container">
          {modulesList.map((module) => (
            <ListItem module={module} />
          ))}
        </ul> 
      : <>No lessons found</>}
    </div>
  );
}

export default ModuleList;
