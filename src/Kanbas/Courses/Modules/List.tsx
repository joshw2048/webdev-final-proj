import "./index.css";
//import { useState } from 'react';
//import { modules } from "../../Database";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { useParams } from "react-router";
import { ListItem } from "./ListItem";
//import { Course, CourseModule } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();

  const moduleList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();

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
            <div className="module-form">
              <div className="textboxes">
                <input className='inputbox' value={module.name}
                  onChange={(e) =>
                    dispatch(setModule({ ...module, name: e.target.value }))
                  }
                />        
                <textarea  className='inputbox' value={module.description}
                  onChange={(e) =>
                    dispatch(setModule({ ...module, description: e.target.value }))
                  }
                />
              </div>
              <div>
                <button 
                  className="button green-button" 
                  onClick={() => dispatch(addModule({ ...module, course: courseId }))}
                >
                  Add
                </button>
                <button 
                  className="button update-button" 
                  onClick={() => dispatch(updateModule(module))}
                >
                  Update
                </button>
              </div>
            </div>
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

