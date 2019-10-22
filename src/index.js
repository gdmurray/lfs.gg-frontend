import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from './serviceWorker';
import configureStore, {history} from './store'
import { Provider } from 'react-redux'
import {Route, Switch} from 'react-router'

import 'semantic-ui-css/semantic.min.css'

import App from "./App";
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import TeamHome from "./components/TeamHome";

const store = configureStore(history)

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute path="/team" component={TeamHome}/>
                <PrivateRoute path="/" component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
  ), document.getElementById('root'));


/*
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login/" component={Login} />
          <PrivateRoute path="/" component={App}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
    */