import React from 'react';
import MainScene from '../../scenes/Main';
import { Provider, connect } from 'react-redux'
import store from './../../store/index';
import { Route, BrowserRouter } from 'react-router-dom';


function App() {
  const appRoutes = (
    <Route path="/list" component ={MainScene}/>
  )
  return (
    <Provider store = {store}>
    <BrowserRouter>{appRoutes}</BrowserRouter>>
    </Provider>
  );
}

export default App;
