import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersList from "../containers/UsersList";
import ManageUsersPage from "../containers/ManageUsersPage";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PageNotFound from "../containers/NotFound";
import HomePage from "../containers/Home";
import ManageTasksPage from "../containers/ManageTasksPage";

function App() {
  return (
    <main className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users" component={UsersList} />
        <Route path="/users/manage-users/:id" component={ManageUsersPage} />
        <Route path="/users/manage-users/" component={ManageUsersPage} />
        <Route path="/tasks/manage-tasks/:id" component={ManageTasksPage} />
        <Route path="/tasks/manage-tasks" component={ManageTasksPage} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
