import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://sleepy-citadel-64673.herokuapp.com/api/users/";

export function getUsers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
export function getUser(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}
export function saveUser(user) {
  let data = { name: user.name };
  return fetch(baseUrl + (user._id || ""), {
    method: user._id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function deleteUser(userId) {
  return fetch(baseUrl + userId, {
    method: "delete",
  })
    .then(handleResponse)
    .catch(handleError);
}
