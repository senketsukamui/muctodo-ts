import React from 'react';
import MainScene from '../../scenes/Main';
import { Provider, connect } from 'react-redux'
import store from './../../store/index';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AuthScene from '../../scenes/Auth';


function App() {
  const appRoutes = (
    <Switch>
    <Route path="/list" component ={MainScene}/>
    <Route path="/" exact = {true} component={AuthScene} />
    </Switch>
  )
  return (
    <Provider store = {store}>
    <BrowserRouter>{appRoutes}</BrowserRouter>>
    </Provider>
  );
}

export default App;
