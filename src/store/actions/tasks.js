import axios from "axios";

export function getAllTasksList() {
  return (dispatch) => {
    try {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((result) => {
          const { data: list, status } = result;

          if (status >= 200 && status < 300) {
            dispatch(setAllTasksList(list));
          } else {
            dispatch(setAllTasksList([]));
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

export function setAllTasksList(allTasksList) {
  return {
    allTasksList,
    type: "SET_ALL_TASKS_LIST"
  };
}
