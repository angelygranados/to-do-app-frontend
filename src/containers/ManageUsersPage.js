import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser, saveUser } from "../redux/actions/usersActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import UserForm from "../components/UsersForm";

const ManageUsersPage = ({ id, loadUser, saveUser, history, ...props }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      loadUser(id)
        .then((res) => setUser(res.data))
        .catch((error) => {
          alert("Failed load users" + error);
        });
    } else {
      setUser({ ...props.users });
    }
  }, []);
  function formIsValid() {
    const { name, _id } = user;
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
        toast.success("User saved.");
        history.push("/users");
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

ManageUsersPage.propTypes = {
  user: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const user = [];
  return {
    id,
    user,
  };
}

const mapDispatchToProps = {
  loadUser,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersPage);
