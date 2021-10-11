import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import { createStore } from "redux";
import rootReducer from "./globalState";
import { Provider } from "react-redux";


const reactAppData = window.cedReactApp || {}
const { appSelector } = reactAppData
const reactAppUrl = reactAppData.apiUrl;
const reactAppPath = reactAppData.apiPath;
const marketplaces = reactAppData.marketplaces;


console.log(marketplaces);
console.log(reactAppUrl);
console.log(reactAppPath);


const globalStorage = createStore(rootReducer);
const appAnchorElement1 = document.querySelector(appSelector);
const appAnchorElement2 = document.querySelector('.ced-main-mapping-page');
const appAnchorElement3 = document.querySelector(".ced-main-configuration-page")
const appAnchorElement4 = document.querySelector('.ced-main-products-page')
const appAnchorElement5 = document.querySelector('.ced-main-orders-page')
const appAnchorElement6 = document.querySelector('.ced-main-logs-page')
const appAnchorElement7 = document.querySelector('.ced-main-templates-page')


if (appAnchorElement1 || appAnchorElement2 || appAnchorElement3 || appAnchorElement4 || appAnchorElement5 || appAnchorElement6 || appAnchorElement7 ) {
  ReactDOM.render(
    <Provider store={globalStorage}>
      <App data = {JSON.stringify({'app_url': reactAppUrl, 'app_path': reactAppPath, 'marketplaces': marketplaces})} />
    </Provider>
    ,
    appAnchorElement1 || appAnchorElement2 || appAnchorElement3 || appAnchorElement4 || appAnchorElement5 || appAnchorElement6 || appAnchorElement7
   
  )
}

serviceWorkerRegistration.register();