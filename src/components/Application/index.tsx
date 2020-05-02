import React from 'react';
import MainScene from '../../scenes/Main';
import { Provider, connect } from 'react-redux'
import store from './../../store/index';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AuthScene from '../../scenes/Auth';
import WelcomeList from '../../scenes/Main/WelcomeList';


function App() {
  const appRoutes = (
    <Switch>
    <Route path="/" exact = {true} component ={MainScene}/>
    <Route path="/auth" exact = {true} component={AuthScene} />
    <Route path="/welcome" component={WelcomeList} />
    </Switch>
  )
  return (
    <Provider store = {store}>
    <BrowserRouter>{appRoutes}</BrowserRouter>
    </Provider>
  );
}

export default App;
