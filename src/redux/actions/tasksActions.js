import * as types from "./actionTypes";
import * as tasksApi from "../../api/tasksApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}
export function createTaskSuccess(task) {
  return { type: types.CREATE_TASK_SUCCESS, task };
}
export function updateTaskSuccess(task) {
  return { type: types.UPDATE_TASK_SUCCESS, task };
}
export function deleteTaskOptimistic(taskId) {
  return { type: types.DELETE_TASK_OPTIMISTIC, taskId };
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
export function loadTask(taskId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return tasksApi.getTask(taskId);
  };
}
export function saveTask(task) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return tasksApi
      .saveTask(task)
      .then((savedTask) => {
        task._id
          ? dispatch(updateTaskSuccess(task))
          : dispatch(createTaskSuccess({ savedTask, ...task }));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
export function deleteTask(taskId) {
  return function (dispatch) {
    dispatch(deleteTaskOptimistic(taskId));
    return tasksApi.deleteTask(taskId);
  };
}
