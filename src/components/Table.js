import React from "react";
import { connect } from "react-redux";
import { deleteTask, saveTask } from "../redux/actions/tasksActions";
import Row from "./common/Row";
import { toast } from "react-toastify";

const Task = ({ history, deleteTask, saveTask, ...props }) => {
  const item = props;
  async function handleDelete(id) {
    toast.success("Task deleted");
    try {
      await deleteTask(id);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  }
  async function toggleState(task) {
    if (task.state === "to do") {
      task.state = "done";
    } else {
      task.state = "to do";
    }
    try {
      await saveTask(task);
      toast.success("State updated.");
    } catch (err) {
      console.log("failed" + err);
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
          {item[1].map((item, index) => (
            <Row
              key={"row" + index}
              task={item}
              onDelete={handleDelete}
              toggleState={toggleState}
            />
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
  saveTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
