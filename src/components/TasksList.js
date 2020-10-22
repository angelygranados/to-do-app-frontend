import React from "react";
import Table from "./Table";

const TasksList = (tasks) => {
  const orderedTasks = [];
  const users = [];
  Object.values(tasks).forEach((item) => {
    orderedTasks[item.username] = [];
    users.push(item.username);
  });
  const uniqueUsers = [...new Set(users)];
  uniqueUsers.map((user) => {
    orderedTasks[user] = Object.values(tasks).filter(
      (item) => item.username == user
    );
  });
  return (
    <>
      {Object.entries(orderedTasks).map((item) => (
        <Table {...item} />
      ))}
    </>
  );
};

export default TasksList;
