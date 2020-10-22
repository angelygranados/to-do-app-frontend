import React from "react";
import { Link } from "react-router-dom";

const Row = ({ task, onDelete }) => {
  return (
    <tr key={task._id}>
      <td>{task.description}</td>
      <td>{task.state}</td>
      <td>
        <Link to={"/tasks/manage-tasks/" + task._id} className="btn add-user">
          Edit
        </Link>
        <button className="btn delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
