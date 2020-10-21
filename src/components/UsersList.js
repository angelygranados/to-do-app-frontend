import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUsers } from "../redux/actions/usersActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./common/Spinner";
import User from "./User";

export function UsersPage({ users, loadUsers, history, ...props }) {
  const [user, setUser] = useState({ ...props.users });
  const [newUser, setNewUser] = useState({
    newUser: false,
  });
  useEffect(() => {
    if (users === undefined) {
      loadUsers().catch((error) => {
        alert("Failed load users" + error);
      });
    } else {
      setUser({ ...props.users });
    }
  }, []);

  return users === undefined ? (
    <Spinner />
  ) : (
    <section className="users">
      <h2>Users</h2>
      <Link to={"/user/"} className="btn add-user">
        Add New User
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Full Name</th>
            <th>Tasks</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} {...user} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  loadUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users.data,
    loading: state.apiCallsInProgress > 0,
  };
};

const mapDispatchToProps = {
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
