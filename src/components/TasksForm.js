import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "./common/TextInput";
import { getUsers } from "../api/usersApi";

const TasksForm = ({ task, onSave, onChange, saving = false, errors = {} }) => {
  const [usersList, setUsersList] = useState({});
  useEffect(() => {
    getUsers()
      .then((res) => setUsersList(res.data))
      .catch((error) => {
        alert("Failed load users" + error);
      });
  }, []);

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
        error={errors.description}
      />
      <div class="form-group">
        <label for="userId">Select user</label>
        <div class="field">
          <select
            name="userId"
            value={task.userId}
            onChange={onChange}
            errors={errors.userId}
          >
            <option id="" value="">
              ---
            </option>
            {Object.values(usersList).map((item) => (
              <option id={item.name} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.userId && (
            <div className="alert alert-danger">{errors.userId}</div>
          )}
        </div>
      </div>
      <div class="form-group">
        <label for="userId">Select state</label>
        <div class="field">
          <select
            name="state"
            label="State"
            value={task.state}
            onChange={onChange}
            error={errors.state}
          >
            <option id="" value="">
              ---
            </option>
            <option value="to do">To Do</option>
            <option value="done">Done</option>
          </select>
          {errors.state && (
            <div className="alert alert-danger">{errors.state}</div>
          )}
        </div>
      </div>

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
