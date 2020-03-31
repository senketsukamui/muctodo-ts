import React from 'react';
import MainScene from '../../scenes/Main';
import { Provider, connect } from 'react-redux'
import store from './../../store/index';


function App() {
  return (
    <Provider store = {store}>
    <MainScene/>
    </Provider>
  );
}

export default App;
