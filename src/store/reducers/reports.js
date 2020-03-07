const initialState = {
  report: [],
  reportLoading: true
};

const reports = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REPORT":
      return {
        ...state,
        report: action.report,
        reportLoading: false
      };

    default:
      return {
        ...state
      };
  }
};

export default reports;
