import { combineReducers } from "redux";
import tasks from "./tasks";
import timer from "./timer";
import reports from "./reports";
import users from "./users";

export default combineReducers({
  tasks,
  timer,
  reports,
  users
});
