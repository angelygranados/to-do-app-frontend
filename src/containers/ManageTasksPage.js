import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser, saveUser } from "../redux/actions/usersActions";
import TasksForm from "../components/TasksForm";

const ManageTasksPage = ({ id, loadUser, saveUser, history, ...props }) => {
  const [task, setTask] = useState({});

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (id !== undefined) {
    } else {
      setTask({ ...props.task });
    }
  }, []);
  console.log(task);
  function formIsValid() {
    const { description, _id, userId, username, state } = task;
    const errors = {};
    if (!description) errors.description = "Description is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  return (
    <section className="manage-users">
      <TasksForm
        task={task}
        errors={errors}
        onChange={handleChange}
        saving={saving}
      />
    </section>
  );
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const task = [];
  return {
    id,
    task,
  };
}

const mapDispatchToProps = {
  loadUser,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasksPage);
