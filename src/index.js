import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ConnectedRouter} from 'connected-react-router'
import * as serviceWorker from './serviceWorker';
import configureStore, {history} from './store'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Route, Switch} from 'react-router'

import 'semantic-ui-css/semantic.min.css'

import Login from './containers/Login';
import LoadingView from "./components/LoadingView";
import PrivateRoute from './containers/PrivateRoute';
import TeamHome from "./containers/Team/TeamHome";
import HomePageLogic from "./containers/HomePageLogic";
import Register from './containers/Register';
import TeamCreate from "./containers/Team/TeamCreate";
import "./App.css";
import {ROUTES} from "./routes";
import Teams from "./containers/Team/Teams";

const {store, persistor} = configureStore(history)

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={<LoadingView/>} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={HomePageLogic}/>
                    <Route exact path={ROUTES.LOGIN} component={Login}/>
                    <Route exact path={ROUTES.REGISTER} component={Register}/>
                    <Route exact path={ROUTES.CREATE_TEAM} component={TeamCreate}/>
                    <Route exact path={ROUTES.TEAMS} component={Teams}/>
                    <PrivateRoute path={ROUTES.TEAM_HOME} component={TeamHome}/>
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
), document.getElementById('root'));
