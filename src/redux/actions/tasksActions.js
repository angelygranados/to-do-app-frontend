import * as types from "./actionTypes";
import * as tasksApi from "../../api/tasksApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

//Trigger API calls

export function loadTasks() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return tasksApi
      .getAllTasks()
      .then((tasks) => {
        dispatch(loadTasksSuccess(tasks));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
