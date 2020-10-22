import React from "react";
import { Link } from "react-router-dom";
import Row from "./common/Row";

const Task = (item) => {
  return (
    <div className="user_tasks_table">
      <h3>{item[0]}</h3>
      <table key={item[0]} className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>State</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {item[1].map((item) => (
            <Row {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
