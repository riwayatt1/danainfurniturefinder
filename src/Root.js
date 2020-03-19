import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import App from './App';


const Root = () => (
  <div>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/furniture-finder" />}
        />
        <Route exact path="/furniture-finder" component={App} />
      </Switch>
    </Router>
  </div>
);

export default Root;
