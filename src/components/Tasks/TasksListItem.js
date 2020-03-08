import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { List } from "semantic-ui-react";
import { getAllTasksList } from "../../store/actions/tasks";
import { startTimer, stopTimer } from "../../store/actions/timer";
import { getAllUsersList, selectUser } from "../../store/actions/users";

class TasksListItem extends React.Component {
  componentDidMount() {
    const { getAllTasksList, getAllUsersList } = this.props;

    getAllTasksList();
    getAllUsersList();
  }

  handleUserChange(event, userData) {
    const { selectUser } = this.props;

    const postData = {
      id: userData.value
    };

    selectUser(postData);
  }

  render() {
    const {
      startTimer,
      stopTimer,
      task,
      timer: {
        timerDetails,
        timerDetails: { taskId: startedTimerTaskId, timerId: startedTimerId }
      }
    } = this.props;

    const { name, description, id: taskId } = task;

    const postData = {
      startedTimerId,
      taskId,
      userId: this.props.users.userData.id
    };

    return (
      <>
        <List.Item>
          <List.Icon
            color="teal"
            disabled={
              (timerDetails.length !== 0 &&
                startedTimerTaskId !== taskId &&
                startedTimerId !== null) ||
              Object.keys(this.props.users.userData).length === 0
            }
            name={
              parseInt(startedTimerTaskId) === parseInt(taskId)
                ? "pause"
                : "play"
            }
            onClick={() =>
              timerDetails.length === 0 ||
              (startedTimerTaskId === null && startedTimerId === null)
                ? startTimer(postData)
                : stopTimer(postData)
            }
            size="large"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header>{name}</List.Header>
            <List.Description>{description}</List.Description>
          </List.Content>
        </List.Item>
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
)(withRouter(TasksListItem));
