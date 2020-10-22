import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://sleepy-citadel-64673.herokuapp.com/api/tasks/";

export function getAllTasks() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
export function getTask(id) {
  return fetch(baseUrl + "task/" + id)
    .then(handleResponse)
    .catch(handleError);
}
export function saveTask(task) {
  let data = {
    userId: task.userId,
    username: task.username,
    state: task.state,
    description: task.description,
  };
  return fetch(baseUrl + (task._id || ""), {
    method: task._id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTask(taskId) {
  return fetch(baseUrl + taskId, {
    method: "delete",
  })
    .then(handleResponse)
    .catch(handleError);
}
