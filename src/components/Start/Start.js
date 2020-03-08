import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Header } from "semantic-ui-react";

function Start() {
  return (
    <>
      <Grid>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={14}>
          <Header as="h1">Start</Header>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel
            velit diam. Morbi non tempor ex. Sed nulla mi, interdum quis pretium
            quis, dignissim sed leo. Aliquam augue dolor, maximus non mattis
            nec, hendrerit sed urna. Maecenas libero quam, lobortis vel sem id,
            eleifend finibus ante. Vestibulum eu mattis nisi. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Proin non enim non tortor pretium finibus sed id
            quam. Sed tristique lacus egestas tempus faucibus. Suspendisse
            mollis nisl massa, vel dignissim libero pretium vulputate.
          </p>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid>
    </>
  );
}

export default withRouter(Start);
