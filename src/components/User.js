import React from "react";
import { Link } from "react-router-dom";

const User = ({ user, onDelete }) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <Link to={"/users/manage-users/" + user._id} className="btn add-user">
          Edit
        </Link>
      </td>
      <td>
        <button className="btn delete" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
