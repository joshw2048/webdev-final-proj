import React from "react";
import './index.css';
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { Assignment } from "../../types";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList: Assignment[] = assignments.filter(
    (assignment) => assignment.course === courseId);

  return (
    <div className='assignments-container'>
      <div className="top-content-container">
        <input type="search" placeholder="Search for Assignment"/>
        <div className="button-group">
          <button className="button"><FaPlus /> Group</button>
          <button className="module-button button"><FaPlus /> Assignment</button>
          <button className="button"><FaEllipsisV /></button>
        </div>
      </div>
      <div className="assignments-wrapper">
        <hr />
        <ul className="list-group wd-modules">
          <li className="list-group-item list-header">
            <div>
              <FaEllipsisV className="me-2" /> 
              ASSIGNMENTS
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
              </span>
            </div>
            <ul className="list-group">
              {assignmentList.map((assignment) => (
                <li className="list-group-item">
                  <div style={{ display: 'flex', alignItems: 'center',}}>
                    <div className='assignment-item'>
                      <FaEllipsisV className="me-2" />
                      <div>
                        <Link
                          to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                        >
                          {assignment.title}
                        </Link>
                        <div>
                          <span style={{ color: '#C8102E' }}>Multiple Modules</span> 
                          {assignment.availableDate && <span> | Not available until {assignment.availableDate.day} at {assignment.availableDate.time}</span>}
                          <span> | Due {assignment.dueDate.day} at {assignment.dueDate.time} | {assignment.points} points </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV />
                    </div>
                  </div>
                </li>))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
);}

export default Assignments;