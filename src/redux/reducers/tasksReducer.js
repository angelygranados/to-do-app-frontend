import * as types from "../actions/actionTypes";

export default function tasksReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        tasks: [...action.tasks.data],
      };
    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case types.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item._id == action.task._id ? action.task : item
        ),
      };
    case types.DELETE_TASK_OPTIMISTIC:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item._id !== action.taskId),
      };
    default:
      return state;
  }
}
