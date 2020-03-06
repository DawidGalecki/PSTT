import React from "react";
import { List } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllTasksList } from "../../store/actions/tasks";
import { withRouter } from "react-router-dom";
import { startTimer, stopTimer } from "../../store/actions/timer";

class TasksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0
    };
  }

  componentDidMount() {
    const { getAllTasksList } = this.props;

    getAllTasksList();
  }

  render() {
    const {
      tasks: { allTasksList },
      startTimer,
      stopTimer,
      timer: {
        timerDetails,
        timerDetails: { taskId: startedTimerTaskId, timerId: startedTimerId }
      }
    } = this.props;

    const { userId } = this.state;

    return (
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
                name={startedTimerTaskId == taskId ? "pause" : "play"}
                size="large"
                verticalAlign="middle"
                onClick={() =>
                  timerDetails.length === 0 ||
                  (startedTimerTaskId === null && startedTimerId === null)
                    ? startTimer(postData)
                    : stopTimer(postData)
                }
                disabled={
                  timerDetails.length !== 0 &&
                  startedTimerTaskId !== taskId &&
                  startedTimerId !== null
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
    stopTimer: (postData) => dispatch(stopTimer(postData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksList));
