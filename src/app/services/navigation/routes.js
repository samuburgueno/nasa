import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from '../../containers/home'

const Routes = () => {
  return (
    <Router>
        <Switch>
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