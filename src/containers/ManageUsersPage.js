import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUsers, saveUser } from "../redux/actions/usersActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import UserForm from "../components/UsersForm";

const ManageUsersPage = ({ users, loadUsers, saveUser, history, ...props }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      loadUsers().catch((error) => {
        alert("Failed load users" + error);
      });
    } else {
      setUser({ ...props.users });
    }
  }, []);
  function formIsValid() {
    const { name } = user;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveUser(user)
      .then(() => {
        toast.success("Course saved.");
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return (
    <section className="manage-users">
      <UserForm
        user={user}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </section>
  );
};

const newUser = {
  id: null,
  name: "",
};
export function getUserBySlug(users, id) {
  if (id === undefined) return;
  console.log(users);
}

ManageUsersPage.propTypes = {
  users: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const user =
    (id && state.users.length > 0) || state.users !== undefined
      ? getUserBySlug(state.users, id)
      : newUser;
  return {
    user,
    users: state.users,
  };
}

const mapDispatchToProps = {
  loadUsers,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersPage);
