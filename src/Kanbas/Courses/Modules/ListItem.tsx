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

export const ListItem = (props: { module: CourseModule }) => {

  const { _id, name, lessons } = props.module;
  const [open, setOpen] = useState(true);

  return (
    <li
      className="list-group-item list-header"
      onClick={() => setOpen(!open)}>
      <div>
        <FaEllipsisV className="me-2" />
        {open ? <FaChevronDown className="me-2" /> : <FaChevronRight className="me-2" />}
        {name}
        <span className="float-end">
          <FaCheckCircle className="text-success" />
          <FaPlusCircle className="ms-2" />
          <FaEllipsisV className="ms-2" />
        </span>
      </div>
      {open && (
        <ul className="list-group">
          {lessons ? lessons.map((lesson) => (
            <li className="list-group-item">
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