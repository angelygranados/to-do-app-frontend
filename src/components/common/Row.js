import React from "react";
import { Link } from "react-router-dom";

const Row = (...task) => {
  return (
    <tr key={task[0]._id}>
      <td>{task[0].description}</td>
      <td>{task[0].state}</td>
      <td>
        <button className="btn">Edit</button>
        <button className="btn delete">Delete</button>
      </td>
    </tr>
  );
};

export default Row;
