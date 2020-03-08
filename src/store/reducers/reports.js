const initialState = {
  report: []
};

const reports = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REPORT":
      return {
        ...state,
        report: action.report
      };

    default:
      return {
        ...state
      };
  }
};

export default reports;
