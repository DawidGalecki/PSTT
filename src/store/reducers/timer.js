const initialState = {
  timerDetails: [],
  timerDetailsLoading: true
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STARTED_TIMER_ID":
      return {
        ...state,
        timerDetails: action.timerDetails,
        timerDetailsLoading: false
      };

    default:
      return {
        ...state
      };
  }
};

export default timer;
