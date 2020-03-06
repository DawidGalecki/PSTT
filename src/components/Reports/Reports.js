import React from "react";
import { withRouter } from "react-router-dom";
import Chart from "./Chart";

function TasksList() {
  return (
    <>
      <p>Raport czasów pracy</p>
      <Chart />
    </>
  );
}

export default withRouter(TasksList);
