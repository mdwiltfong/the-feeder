import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../common/Header';
import Home from '../home/Home';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import RecipeSearch from '../recipes/RecipeSearch';
import Recipe from '../recipes/Recipe';
import Footer from '../common/Footer';


function Routes ({ login, signup }) {

  return (
    <div className="pt-5">
      <BrowserRouter>
        <Header />
        <Switch>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/login'>
            <LoginForm login={login} />
          </Route>

          <Route exact path='/signup'>
            <SignupForm signup={signup} />
          </Route>

          <Route exact path='/recipes'>
            <RecipeSearch />
          </Route>

          <Route exact path='/recipes/:id'>
            <Recipe />
          </Route>

          <Redirect to="/" />
        
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default Routes;