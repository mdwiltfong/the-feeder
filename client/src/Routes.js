import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Home from './Home';
import Recipe from './Recipe';


function Routes () {

  return (
    <div className="pt-5">
      <Switch>

        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/recipes/:ingredient'>
          <Recipe />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default Routes;