import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { startTimer, stopTimer, getDetails } from "../../store/actions/timer";

class Timer extends React.Component {
  render() {
    const {
      stopTimer,
      timer: {
        timerDetails,
        timerDetails: {
          taskId: startedTimerTaskId,
          taskName: startedTimerTaskName,
          timerId: startedTimerId
        }
      }
    } = this.props;
    console.log(this.props);

    const userId = 0;

    const postData = {
      userId,
      taskId: startedTimerTaskId,
      startedTimerId
    };

    return timerDetails.length === 0 || startedTimerTaskId === null ? (
      <>
        <Icon name="clock" />
      </>
    ) : (
      <>
        <Icon name="pause" onClick={() => stopTimer(postData)} />
        {startedTimerTaskName}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    stopTimer: (postData) => dispatch(stopTimer(postData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Timer));
