import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "./common/TextInput";

const TasksForm = ({ task, onSave, onChange, saving = false, errors = {} }) => {
  const [usersList, setUsersList] = useState({
    users: [],
  });
  return (
    <form onSubmit={onSave}>
      <Link to={"/"} className="btn return">
        BACK
      </Link>
      <h2>New Task</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="description"
        label="Description"
        value={task.description}
        onChange={onChange}
        error={errors.name}
      />
      <select
        name="state"
        label="State"
        onChange={onChange}
        error={errors.state}
      >
        <option>To Do</option>
        <option>Done</option>
      </select>
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

TasksForm.propTypes = {
  task: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default TasksForm;
