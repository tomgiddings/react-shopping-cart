import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'

import Header from './components/Header';
import Products from './components/Products';
import Checkout from './components/Checkout';

var store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <Route path='/' component={Header} />
        <section>
          <Switch>
            <Route exact path='/' component={Products} />
            <Route exact path='/checkout' component={Checkout} />
          </Switch>
        </section>
      </div>
    </Provider>
  </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
