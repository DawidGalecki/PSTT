const initialState = {
  allTasksList: []
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_TASKS_LIST":
      return {
        ...state,
        allTasksList: action.allTasksList
      };

    default:
      return {
        ...state
      };
  }
};

export default tasks;
