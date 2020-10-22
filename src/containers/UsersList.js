import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUsers, deleteUser } from "../redux/actions/usersActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../components/common/Spinner";
import User from "../components/User";
import { toast } from "react-toastify";

export function UsersPage({ users, loadUsers, deleteUser, history, ...props }) {
  const [user, setUser] = useState({ ...props.users });
  useEffect(() => {
    if (users === undefined) {
      loadUsers().catch((error) => {
        alert("Failed load users" + error);
      });
    } else {
      setUser({ ...props.users });
    }
  }, []);

  async function handleDelete(id) {
    toast.success("User deleted");
    try {
      await deleteUser(id);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  }
  return users === undefined ? (
    <Spinner />
  ) : (
    <section className="users">
      <div className="users__actions">
        <h2>Users</h2>
        <Link to={"/users/manage-users/"} className="btn add-user">
          Add New User
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} onDelete={handleDelete} user={user} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

UsersPage.propTypes = {
  loadUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
    loading: state.apiCallsInProgress > 0,
  };
};

const mapDispatchToProps = {
  deleteUser,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
