import * as types from "./actionTypes";
import * as usersApi from "../../api/usersApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}

export function deleteUserOptimistic(user) {
  return { type: types.DELETE_USER_OPTIMISTIC, user };
}

export function loadUsers() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return usersApi
      .getUsers()
      .then((users) => {
        dispatch(loadUsersSuccess(users));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
export function loadUser(user) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return usersApi.getUser(user);
  };
}
export function saveUser(user) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return usersApi
      .saveUser(user)
      .then((savedUser) => {
        user._id
          ? dispatch(updateUserSuccess(user))
          : dispatch(
              createUserSuccess({ name: user.name, _id: savedUser.data })
            );
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteUser(user) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteUserOptimistic(user));
    return usersApi.deleteUser(user);
  };
}
