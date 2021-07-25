import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createStore, compose, applyMiddleware } from 'redux';
// import AsyncStorage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducers from '../reducers';
import rootSaga from '../sagas/rootSaga';
import creatSagaMiddleware from 'redux-saga';
const sagaMiddleware = creatSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

const enhancer = compose(
    applyMiddleware(...middlewares),
    devToolsEnhancer({ realtime: true })
);

const config = {
    key: 'root',
    debug: true,
    whitelist: [
        'auth',
        'loader',
    ],
    storage: AsyncStorage
};

const reducers = persistCombineReducers(config, rootReducers);

const configureStore = () => {
    const store = createStore(
        reducers,
        undefined,
        enhancer,
    );
    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);
    return { persistor, store };
};

export const { persistor, store } = configureStore();