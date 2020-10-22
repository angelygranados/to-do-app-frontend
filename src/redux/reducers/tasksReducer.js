import * as types from "../actions/actionTypes";

export default function tasksReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        tasks: [...action.tasks.data],
      };
    default:
      return state;
  }
}
