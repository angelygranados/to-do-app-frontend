import { useReducer } from "react";
import { act } from "react-dom/test-utils";
import * as types from "../actions/actionTypes";

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    case types.CREATE_USER_SUCCESS:
      return [...state, { ...action.user }];
    case types.UPDATE_USER_SUCCESS:
      return state.map((user) =>
        user.id === action.user ? action.user : user
      );
    case types.DELETE_USER_OPTIMISTIC:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
