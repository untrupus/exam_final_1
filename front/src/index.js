import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import store, {history} from "./store/configureStore";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "./axiosApi";

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.user.token;
    } catch(e) {
        // no token exists
    }
    return config;
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
