import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTask } from "../redux/actions/tasksActions";
import Row from "./common/Row";
import { toast } from "react-toastify";

const Task = ({ history, deleteTask, ...props }) => {
  const item = props;
  async function handleDelete(id) {
    toast.success("Task deleted");
    try {
      let deletedTasks = await deleteTask(id);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  }
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
            <Row task={item} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = {
  deleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
