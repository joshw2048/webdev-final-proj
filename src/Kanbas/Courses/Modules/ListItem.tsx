import React, { useState } from "react";
import "./index.css";
import { 
  FaEllipsisV, 
  FaCheckCircle, 
  FaPlusCircle, 
  FaChevronDown, 
  FaChevronRight 
} from "react-icons/fa";
import { CourseModule } from "../../types";
import { useDispatch } from "react-redux";

interface Props {
  module: CourseModule;
  deleteModule: (id: string | undefined) => void;
  updateModule: any;
}

export const ListItem = (props: Props) => {
  const { module, deleteModule, updateModule } = props;
  const { name, lessons } = module;
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  return (
    <li
      className="list-group-item list-header"
      key={name}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <FaEllipsisV className="me-2" />
          {open ? 
            <FaChevronDown onClick={() => setOpen(false)} className="me-2" /> : 
            <FaChevronRight onClick={() => setOpen(true)} className="me-2" />
          }
          {name}
        </div>
        <div>
          <button
            className="button module-button"
            onClick={() => deleteModule(module._id)}>
            Delete
          </button>
          <button
            className="button green-button"
            onClick={() => {
              dispatch(updateModule(module))
              setOpen(true)
            }}>
            Edit
          </button>
          <FaCheckCircle className="text-success" />
          <FaPlusCircle className="ms-2" />
          <FaEllipsisV className="ms-2" />
        </div>
      </div>
      {open && (
        <ul className="list-group">
          {lessons ? lessons.map((lesson) => (
            <li className="list-group-item" key={lesson.name}>
              <FaEllipsisV className="me-2" />
              {lesson.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaEllipsisV className="ms-2" />
              </span>
            </li>
          )) : <div style={{ backgroundColor: 'white' }}>No lessons found</div>}
        </ul>
      )}
    </li>
  )
}