import "./index.css";
import { useState, useEffect } from 'react';
import * as client from "./client";
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
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const moduleList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();

  const modulesList = moduleList.filter((module) => module.course === courseId);
  
  const handleAddModule = () => {
    client.createModule(courseId, {...module, id: `${Math.random() * 1000000000}`}).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string | undefined) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

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
            onClick={handleAddModule}
          >
            Add
          </button>
          <button 
            className="button update-button" 
            onClick={handleUpdateModule}
          >
            Update
          </button>
        </div>
      </div>
      {modulesList.length > 0 ? 
        <ul className="list-group wd-modules list-container">
          {modulesList.map((module, index) => (
            <ListItem 
              key={index} 
              module={module} 
              deleteModule={handleDeleteModule} 
              updateModule={setModule}
            />
          ))}
        </ul> 
      : <>No lessons found</>}
    </div>
  );
}

export default ModuleList;

