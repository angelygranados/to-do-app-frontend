import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import tasksReducer from "./tasksReducer";

const rootReducer = combineReducers({
  usersReducer,
  tasksReducer,
});

export default rootReducer;
