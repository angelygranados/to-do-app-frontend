import React from "react";
import { Link } from "react-router-dom";
import checkIcon from "../../assets/images/check.png";
import checkedIcon from "../../assets/images/checked.png";

const Row = ({ task, onDelete, toggleState }) => {
  return (
    <tr key={task._id}>
      <td>{task.description}</td>
      <td>
        <button className="check" onClick={() => toggleState(task)}>
          <img
            src={task.state === "done" ? checkedIcon : checkIcon}
            alt={`Task ${task.description} state`}
          />
        </button>
      </td>
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
