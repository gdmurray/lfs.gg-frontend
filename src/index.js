import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from './serviceWorker';
import configureStore, {history} from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import {Route, Switch} from 'react-router'

import 'semantic-ui-css/semantic.min.css'

import App from "./App";
import Login from './containers/Login';
import LoadingView from "./components/LoadingView";
import PrivateRoute from './containers/PrivateRoute';
import TeamHome from "./containers/Team/TeamHome";
import HomePageLogic from "./containers/HomePageLogic";
import HomepageLayout from './components/Landing/Landing';
import Register from './containers/Register';
const {store, persistor} = configureStore(history)

ReactDOM.render((
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
          <ConnectedRouter history={history}>
          <Switch>
              <Route exact path="/" component={HomePageLogic}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <PrivateRoute path="/team" component={TeamHome}/>
          </Switch>
          </ConnectedRouter>
        </PersistGate>
    </Provider>
  ), document.getElementById('root'));