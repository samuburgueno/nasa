import React from 'react'
import {
    Switch,
    Route,
    Redirect,
    Router
} from "react-router-dom";

import Home from '../../containers/home'
import history from './history';

const Routes = () => {
  return (
    <Router history={history}>
        <Switch>
            <Route exact path="/">
                <Redirect to="/curiosity" />
            </Route>

            <Route path="/curiosity">
                <Home selectedRover="curiosity" />
            </Route>
            
            <Route path="/opportunity">
                <Home selectedRover="opportunity" />
            </Route>
          
            <Route path="/spirit">
                <Home selectedRover="spirit" />
            </Route>
        </Switch>
    </Router>
  );
}

export default Routes