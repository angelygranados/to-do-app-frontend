import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersList from "./UsersList";
import ManageUsersPage from "./ManageUsersPage";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PageNotFound from "../containers/NotFound";

function App() {
  return (
    <main className="app">
      <Header />
      <Switch>
        <Route exact path="/users" component={UsersList} />
        <Route path="/users/manage-users/:id" component={ManageUsersPage} />
        <Route path="/users/manage-users" component={ManageUsersPage} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
