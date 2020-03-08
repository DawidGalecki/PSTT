import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid, Header } from "semantic-ui-react";
import SelectUser from "./SelectUser";
import TasksList from "./TasksList";
import { getAllTasksList } from "../../store/actions/tasks";
import { startTimer, stopTimer } from "../../store/actions/timer";
import { getAllUsersList, selectUser } from "../../store/actions/users";

class Tasks extends React.Component {
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
    return (
      <>
        <Grid>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <Header as="h1">Lista zadań</Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              tellus est. Etiam gravida ipsum sit amet fringilla fringilla.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Aliquam erat volutpat. Sed aliquam magna a diam egestas tristique.
              Sed pharetra erat ac sollicitudin luctus. Donec ornare erat
              lacinia condimentum vulputate. Aenean tristique est vel ligula
              porta ornare vitae faucibus enim.
            </p>
            <SelectUser />
            <TasksList />
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tasks));
