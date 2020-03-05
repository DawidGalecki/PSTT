import React from "react";
import { TasksList } from "./components/TasksList/TasksList";
import { MainMenu } from "./components/Common/MainMenu";

function App() {
  return (
    <>
      <MainMenu />
      <TasksList />
    </>
  );
}

export default App;
