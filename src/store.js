import storage from 'redux-persist/es/storage'
//import { apiMiddleware } from 'redux-api-middleware';
import apiMiddleware from './middleware';
import { applyMiddleware, createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createFilter   } from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
    const persistedFilter = createFilter(
        'auth', ['access', 'refresh']);

    const reducer = persistReducer(
        {
            key: 'root',
            storage: storage,
            whitelist: ['auth'],
            blacklist: ['router'],
            transforms: [persistedFilter]
        },
        createRootReducer(history))
    
    const store = createStore(
        reducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                apiMiddleware,
                routerMiddleware(history)
            )
        )
    )

    const persistor = persistStore(store);
    return {store: store, persistor: persistor}
}