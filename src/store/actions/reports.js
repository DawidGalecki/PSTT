import axios from "axios";
import { API_URL } from "../../constants";

export function getReport(postData) {
  return (dispatch) => {
    try {
      axios
        .post(API_URL + "Reports/Get", postData)
        .then((result) => {
          const { data, status } = result;

          if (status >= 200 && status < 300) {
            dispatch(setReport(data));
          } else {
            dispatch(setReport([]));
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

export function setReport(report) {
  return {
    report,
    type: "SET_REPORT"
  };
}
