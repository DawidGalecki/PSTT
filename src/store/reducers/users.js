const initialState = {
  allUsersList: [],
  allUsersListLoading: true,
  userData: {},
  userDataLoading: false
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_USERS_LIST":
      const allUsersList = action.allUsersList.map((user) => {
        return {
          key: user.id,
          text: user.name,
          value: user.id
        };
      });

      return {
        ...state,
        allUsersList,
        allUsersListLoading: false
      };

    case "SET_SELECTED_USER":
      return {
        ...state,
        userData: action.userData,
        userDataLoading: false
      };

    default:
      return {
        ...state
      };
  }
};

export default users;
