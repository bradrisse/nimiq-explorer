import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from 'routes/App';
import reducers from "ducks/combine";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import theme from './theme'
import registerServiceWorker from "./registerServiceWorker";
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';


import './index.css';
import './i18n';

const client = axios.create({
    baseURL:'https://nimiqexplorer.com/api',
    responseType: 'json'
});

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );
let store = null;

store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
