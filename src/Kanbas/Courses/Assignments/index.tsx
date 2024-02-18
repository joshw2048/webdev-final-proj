import React from "react";
import './index.css';
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { Assignment } from "../../types";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList: Assignment[] = assignments.filter(
    (assignment) => assignment.course === courseId);

  return (
    <div className='assignments-container'>
      {/* {<!-- Add buttons and other fields here -->} */}
      <div className='top-button-container'>
        <div>

        </div>
      </div>
      <div className="assignments-wrapper">
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
                  <FaEllipsisV className="me-2" />
                  <Link
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
                </li>))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
);}

export default Assignments;