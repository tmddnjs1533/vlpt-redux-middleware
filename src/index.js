import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import logger from "redux-logger/src";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk'
import { BrowserRouter } from "react-router-dom";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, logger)) // 미들웨어 적용 + 개발자도구 적용 + 여러 개 적용 시 마지막은 logger로
)

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
