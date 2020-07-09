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

import LoadingView from "./app/common/LoadingView";
import "./App.css";
import {ROUTES} from "./utils/routes";
import App from "./App";

export const {store, persistor} = configureStore(history)

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={<LoadingView/>} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
), document.getElementById('root'));
