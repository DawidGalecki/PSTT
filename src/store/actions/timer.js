import axios from "axios";
import { API_URL } from "../../constants";

export function startTimer(postData) {
  return (dispatch) => {
    try {
      axios
        .post(API_URL + "Timers/Start", postData)
        .then((result) => {
          const { data: timerDetails, status } = result;

          if (status >= 200 && status < 300) {
            dispatch(setTimerStarted(timerDetails));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function stopTimer(postData) {
  return (dispatch) => {
    try {
      axios
        .post(API_URL + "Timers/Stop", postData)
        .then((result) => {
          const { data: timerDetails, status } = result;

          if (status >= 200 && status < 300) {
            dispatch(setTimerStarted(timerDetails));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setTimerStarted(timerDetails) {
  return {
    timerDetails,
    type: "SET_STARTED_TIMER_ID"
  };
}
