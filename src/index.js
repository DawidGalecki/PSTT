import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import TasksList from "./components/TasksList/TasksList";
import { Route, Switch } from "react-router";
import { MENU } from "./constants";
import MainMenu from "./components/Common/MainMenu";
import Reports from "./components/Reports/Reports";
import Start from "./components/Start/Start";
import Error404 from "./components/Error404/Error404";

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MainMenu />
          <Switch>
            <Route exact path={MENU.START.NAME} component={Start} />
            <Route exact path={MENU.TASKS.NAME} component={TasksList} />
            <Route exact path={MENU.REPORTS.NAME} component={Reports} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>,
  document.getElementById("root")
);

serviceWorker.unregister();
