import { combineReducers } from "redux";
import tasks from "./tasks";
import timer from "./timer";
import reports from "./reports";

export default combineReducers({
  tasks,
  timer,
  reports
});
