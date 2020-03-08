import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Grid, Header } from "semantic-ui-react";

function Error404(props) {
  return (
    <>
      <Grid>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={14}>
          <Header as="h1">Błąd 404</Header>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque mollis aliquam turpis sed lobortis. Cras nisi nulla,
            iaculis at tincidunt et, sodales quis enim. Sed feugiat congue sem.
            Sed elementum massa ac ipsum tincidunt, in dapibus nulla tincidunt.
            Proin hendrerit condimentum sagittis. Vestibulum lacinia, nisl vel
            ullamcorper ullamcorper, augue mi mattis felis, sit amet semper nunc
            eros vel justo. Sed finibus, orci et condimentum iaculis, lectus
            enim fringilla dui, in dapibus nibh mi vitae mi. Aenean ornare, dui
            eget cursus venenatis, ipsum purus malesuada risus, sit amet cursus
            nunc ex id nulla.
          </p>
          <Button primary onClick={() => props.history.goBack()}>
            Wróć
          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default withRouter(Error404);
