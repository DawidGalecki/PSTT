import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";
import Timer from "../Timer/Timer";
import { MENU } from "../../constants";

function MainMenu(props) {
  const {
    history,
    location: { pathname }
  } = props;

  return (
    <Grid>
      <Grid.Column width={1}></Grid.Column>
      <Grid.Column width={14}>
        <Menu tabular>
          <Menu.Item
            active={MENU.START.NAME === pathname}
            content={MENU.START.CONTENT}
            name={MENU.START.NAME}
            onClick={() => history.push(MENU.START.NAME)}
          />
          <Menu.Item
            active={MENU.TASKS.NAME === pathname}
            content={MENU.TASKS.CONTENT}
            name={MENU.TASKS.NAME}
            onClick={() => history.push(MENU.TASKS.NAME)}
          />
          <Menu.Item
            active={MENU.REPORTS.NAME === pathname}
            content={MENU.REPORTS.CONTENT}
            name={MENU.REPORTS.NAME}
            onClick={() => history.push(MENU.REPORTS.NAME)}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Timer />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid.Column>
      <Grid.Column width={1}></Grid.Column>
    </Grid>
  );
}

export default withRouter(MainMenu);
