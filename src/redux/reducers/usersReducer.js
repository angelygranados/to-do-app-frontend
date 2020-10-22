import * as types from "../actions/actionTypes";

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.users.data],
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((item) =>
          item._id === action.user._id ? action.user : item
        ),
      };
    case types.DELETE_USER_OPTIMISTIC:
      return {
        ...state,
        users: state.users.filter((item) => item._id !== action.user),
      };
    default:
      return state;
  }
}
