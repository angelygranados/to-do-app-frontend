import React from "react";
import { Route, Switch } from "react-router-dom";
import UsersList from "../components/UsersList";
import ManageUsersPage from "./ManageUsersPage";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PageNotFound from "../containers/NotFound";

function App() {
  return (
    <main className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={UsersList} />
        <Route path="/user/:id" component={ManageUsersPage} />
        <Route path="/user" component={ManageUsersPage} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
