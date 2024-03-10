import "./index.css";
import { useState } from 'react';
import { modules } from "../../Database";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { useParams } from "react-router";
import { ListItem } from "./ListItem";
import { Course, CourseModule } from "../../types";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addModule,
//   deleteModule,
//   updateModule,
//   setModule,
// } from "./reducer";
// import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  const [moduleList, setModuleList] = useState<CourseModule[]>(modules);

  const [module, setModule] = useState<CourseModule>({
    name: "New Module",
    description: "New Description",
    course: courseId ?? '',
    _id: courseId + 'module' ?? '',
  });

  const addModule = (module: any) => {
    const newModule = { ...module,
      _id: new Date().getTime().toString() };
    const newModuleList = [newModule, ...moduleList];
    setModuleList(newModuleList);
  };

  const deleteModule = (moduleId: string) => {
    const newModuleList = moduleList.filter(
      (module) => module._id !== moduleId );
    setModuleList(newModuleList);
  };

  const updateModule = () => {
    const newModuleList = moduleList.map((m) => {
      if (m._id === module._id) {
        return module;
      } else {
        return m;
      }
    });
    setModuleList(newModuleList);
  };

  const modulesList = moduleList.filter((module) => module.course === courseId);
  
  console.log(moduleList, courseId, "\n\n")
  console.log(modulesList, modulesList.length > 0)

  return (
    <div className="module-wrapper">
      <div className="top-content-container">
        <button className="button">Collapse All</button>
        <button className="button">View Progress</button>
        <select className="select" id="select-publish">
          <option value="ALL">Publish All</option>
        </select>
        <button className="module-button button"><FaPlus /> Modules</button>
        <button className="button"><FaEllipsisV /></button>
      </div>
      <hr />
      {modulesList.length > 0 ? 
        <ul className="list-group wd-modules list-container">
          <li className="list-group-item">
            <button onClick={() => { addModule(module) }}>Add</button>
            <button onClick={updateModule}>
              Update
            </button>
            <input value={module.name}
              onChange={(e) => setModule({
                ...module, name: e.target.value })}
            />
            <textarea value={module.description}
              onChange={(e) => setModule({
                ...module, description: e.target.value })}
            />
          </li>


          {modulesList.map((module, index) => (
            <ListItem 
              key={index} 
              module={module} 
              deleteModule={deleteModule} 
              updateModule={setModule}
            />
          ))}
        </ul> 
      : <>No lessons found</>}
    </div>
  );
}

export default ModuleList;

