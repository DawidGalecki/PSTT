import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, List } from "semantic-ui-react";
import TasksListItem from "./TasksListItem";
import { getAllTasksList } from "../../store/actions/tasks";
import { startTimer, stopTimer } from "../../store/actions/timer";
import { getAllUsersList, selectUser } from "../../store/actions/users";

class TasksList extends React.Component {
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
      tasks: { allTasksList }
    } = this.props;

    return (
      <>
        <Header as="p">Lista zadań</Header>
        <List divided relaxed>
          {allTasksList.map((task, key) => {
            return <TasksListItem key={key} task={task} />;
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
    getAllUsersList: () => dispatch(getAllUsersList()),
    selectUser: (postData) => dispatch(selectUser(postData)),
    startTimer: (postData) => dispatch(startTimer(postData)),
    stopTimer: (postData) => dispatch(stopTimer(postData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksList));
