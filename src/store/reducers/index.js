import { combineReducers } from "redux";
import reports from "./reports";
import tasks from "./tasks";
import timer from "./timer";
import users from "./users";

export default combineReducers({
  reports,
  tasks,
  timer,
  users
});
