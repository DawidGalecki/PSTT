import React from "react";
import { List } from "semantic-ui-react";
import { connect } from "react-redux";
import { getAllTasksList } from "../../store/actions/tasks";
import { withRouter } from "react-router-dom";

class TasksList extends React.Component {
  componentDidMount() {
    const { getAllTasksList } = this.props;

    getAllTasksList();
  }

  render() {
    const {
      tasks: { allTasksList }
    } = this.props;

    return (
      <List divided relaxed>
        {allTasksList.map((task, key) => {
          const { title, body } = task;

          return (
            <List.Item key={key}>
              <List.Icon name="play" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{title}</List.Header>
                <List.Description>{body}</List.Description>
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
    getAllTasksList: () => dispatch(getAllTasksList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksList));
