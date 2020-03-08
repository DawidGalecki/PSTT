import React from "react";
import { List, Dropdown, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllTasksList } from "../../store/actions/tasks";
import { getAllUsersList } from "../../store/actions/users";
import { withRouter } from "react-router-dom";
import { startTimer, stopTimer } from "../../store/actions/timer";

class TasksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      userName: "BRAK"
    };
  }

  componentDidMount() {
    const { getAllTasksList, getAllUsersList } = this.props;

    getAllTasksList();
    getAllUsersList();
  }

  handleUserChange(e, data) {
    this.setState({ userId: data.value });

    const {
      users: { allUsersList }
    } = this.props;

    const user = allUsersList.filter(
      (user) => parseInt(user.value) === parseInt(data.value)
    );

    this.setState({ userName: user[0].text });
  }

  render() {
    const {
      tasks: { allTasksList },
      startTimer,
      stopTimer,
      timer: {
        timerDetails,
        timerDetails: { taskId: startedTimerTaskId, timerId: startedTimerId }
      },
      users: { allUsersList }
    } = this.props;

    const { userId, userName } = this.state;

    return (
      <>
        <Dropdown
          selection
          placeholder="Wybierz użytkownika"
          options={allUsersList}
          onChange={(e, data) => this.handleUserChange(e, data)}
          disabled={
            timerDetails.length !== 0 &&
            startedTimerId !== null
          }
        />

        <Label tag color="">
          Aktualnie wybrany użytkownik: {userName}
        </Label>

        <List divided relaxed>
          {allTasksList.map((task, key) => {
            const { name, description, id: taskId } = task;
            const postData = {
              userId,
              taskId,
              startedTimerId
            };

            return (
              <List.Item key={key}>
                <List.Icon
                  name={
                    parseInt(startedTimerTaskId) === parseInt(taskId)
                      ? "pause"
                      : "play"
                  }
                  size="large"
                  verticalAlign="middle"
                  onClick={() =>
                    timerDetails.length === 0 ||
                    (startedTimerTaskId === null && startedTimerId === null)
                      ? startTimer(postData)
                      : stopTimer(postData)
                  }
                  disabled={
                    (timerDetails.length !== 0 &&
                      startedTimerTaskId !== taskId &&
                      startedTimerId !== null) ||
                    userId === 0
                  }
                />
                <List.Content>
                  <List.Header>{name}</List.Header>
                  <List.Description>{description}</List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
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
    startTimer: (postData) => dispatch(startTimer(postData)),
    stopTimer: (postData) => dispatch(stopTimer(postData)),
    getAllUsersList: () => dispatch(getAllUsersList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksList));
