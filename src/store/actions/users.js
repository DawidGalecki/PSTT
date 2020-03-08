import axios from "axios";
import { API_URL } from "../../constants";

export function getAllUsersList() {
  return (dispatch) => {
    try {
      axios
        .get(API_URL + "User/List")
        .then((result) => {
          const { data: list, status } = result;

          if (status >= 200 && status < 300) {
            dispatch(setAllUsersList(list));
          } else {
            dispatch(setAllUsersList([]));
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

export function setAllUsersList(allUsersList) {
  return {
    allUsersList,
    type: "SET_ALL_USERS_LIST"
  };
}
