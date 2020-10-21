import React from "react";
import { Link } from "react-router-dom";

const User = (user) => {
  return (
    <tr key={user._id}>
      <td></td>
      <td>{user.name}</td>
      <td>Tasks</td>
      <td>
        <Link to={"/user/" + user._id} className="btn add-user">
          Edit
        </Link>
      </td>
      <td>Delete</td>
    </tr>
  );
};

export default User;
