import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTask, saveTask } from "../redux/actions/tasksActions";
import TasksForm from "../components/TasksForm";
import { toast } from "react-toastify";

const ManageTasksPage = ({ id, saveTask, loadTask, history, ...props }) => {
  const [task, setTask] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      loadTask(id)
        .then((res) => setTask(res.data))
        .catch((error) => {
          alert("Failed load tasks" + error);
        });
    } else {
      setTask({ ...props.task });
    }
  }, []);

  function formIsValid() {
    const { description, userId, state } = task;
    const errors = {};
    if (!description) errors.description = "Description is required.";
    if (!userId) errors.userId = "User is required";
    if (!state) errors.state = "State is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleChange(event) {
    const { name, value } = event.target;
    let index = event.nativeEvent.target.selectedIndex;
    if (name === "userId") {
      setTask((prevTask) => ({
        ...prevTask,
        ["username"]: event.nativeEvent.target[index].text,
      }));
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveTask(task)
      .then(() => {
        toast.success("Task saved.");
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return (
    <section className="manage-users">
      <TasksForm
        task={task}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
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
  saveTask,
  loadTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasksPage);
