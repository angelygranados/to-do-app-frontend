import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://sleepy-citadel-64673.herokuapp.com/api/tasks/";

export function getAllTasks() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
