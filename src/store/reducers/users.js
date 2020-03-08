const initialState = {
  allUsersList: [],
  allUsersListLoading: true
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

    default:
      return {
        ...state
      };
  }
};

export default users;
