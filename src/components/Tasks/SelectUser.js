import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dropdown, Header, Label } from "semantic-ui-react";
import { getAllTasksList } from "../../store/actions/tasks";
import { startTimer, stopTimer } from "../../store/actions/timer";
import { getAllUsersList, selectUser } from "../../store/actions/users";

class SelectUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null
    };
  }

  componentDidMount() {
    const { getAllTasksList, getAllUsersList } = this.props;

    getAllTasksList();
    getAllUsersList();

    this.setState({
      userName: this.props.users.userData.name || "BRAK"
    });
  }

  handleUserChange(event, userData) {
    const { selectUser } = this.props;

    const postData = {
      id: userData.value
    };

    selectUser(postData);

    this.setState({
      userName: this.props.users.allUsersList.filter(
        (user) => parseInt(user.value) === parseInt(userData.value)
      )[0].text
    });
  }

  render() {
    const { userName } = this.state;

    const {
      timer: {
        timerDetails,
        timerDetails: { timerId: startedTimerId }
      },
      users: { allUsersList }
    } = this.props;

    return (
      <>
        <Header as="p">Wybierz użytkownika</Header>
        <Dropdown
          disabled={timerDetails.length !== 0 && startedTimerId !== null}
          onChange={(event, data) => this.handleUserChange(event, data)}
          options={allUsersList}
          placeholder="Wybierz użytkownika"
          selection
        />
        <Label color="teal">Aktualnie wybrany użytkownik: {userName}</Label>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasksList: () => dispatch(getAllTasksList()),
    getAllUsersList: () => dispatch(getAllUsersList()),
    selectUser: (postData) => dispatch(selectUser(postData)),
    startTimer: (postData) => dispatch(startTimer(postData)),
    stopTimer: (postData) => dispatch(stopTimer(postData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SelectUser));
