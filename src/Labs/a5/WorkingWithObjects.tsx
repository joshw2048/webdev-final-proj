import React, { useState } from "react";
function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment"

  const [module, setModule] = useState({
    id: 2,
    name: 'Webdev course',
    description: "For webdev",
    course: "Web Development 101",
  });

  const MODULE_URL = "http://localhost:4000/a5/module";

  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a href="http://localhost:4000/a5/assignment">
        Get Assignment
      </a>
      <h4>Retrieving Properties</h4>
      <a href="http://localhost:4000/a5/assignment/title">
        Get Title
      </a>
      <h4>Modifying Properties</h4>
      <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input type="text" 
        onChange={(e) => setAssignment({ ...assignment,
            title: e.target.value })}
        value={assignment.title}/> <br />
      <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input type="number" 
        onChange={(e) => setAssignment({ ...assignment,
            score: parseInt(e.target.value) })}
        value={assignment.score}/> <br />
      <a href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
      <input type="checkbox" name="Completed" 
        onChange={(e) => setAssignment({ ...assignment, completed: !assignment.completed})}/> <br />
      <a href="http://localhost:4000/a5/module">
        Get Module
      </a> <br />
      <a href="http://localhost:4000/a5/module/name">
        Get Module name
      </a> <br />
      <a href={`${MODULE_URL}/name/${module.name}`}>
        Update module name
      </a>
      <input type="text" 
        onChange={(e) => setModule({ ...module,
            name: e.target.value })}
        value={module.name}/> <br />
      <a href={`${MODULE_URL}/description/${module.description}`}>
        Update module description
      </a>
      <input type="text" 
        onChange={(e) => setModule({ ...module,
            description: e.target.value })}
        value={module.description}/> <br />
    </div>
  );
}
export default WorkingWithObjects;