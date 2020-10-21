import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "./common/TextInput";

const UserForm = ({ user, onSave, onChange, saving = false, errors = {} }) => {
  console.log(user);
  return (
    <form onSubmit={onSave}>
      <Link to={"/users/"} className="btn return">
        BACK
      </Link>
      <h2>{user._id ? "Edit" : "Add"} User</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Full Name"
        value={user.name}
        onChange={onChange}
        error={errors.name}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default UserForm;
