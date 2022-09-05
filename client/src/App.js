import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StripeSuccess from "./pages/stripe-success";
import StripeCancel from "./pages/stripe-cancel";
import AuthRoute from './components/routes/AuthRoute'
import Account from "./pages/account";
import Basic from "./pages/pages/Basic";
import Standard from "./pages/pages/Standard";
import Premium from "./pages/pages/Premium";

function App() {
  return (
    <Router>
      <Nav />
      <Toaster
        position="buttom-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path='/stripe/success' component={StripeSuccess}/>
        <AuthRoute exact path='/stripe/cancel' component={StripeCancel}/>
        <AuthRoute exact path='/account' component={Account}/>
        <AuthRoute exact path='/basic' component={Basic}/>
        <AuthRoute exact path='/standard' component={Standard}/>
        <AuthRoute exact path='/premium' component={Premium}/>

      </Switch>
    </Router>
  );
}

export default App;
