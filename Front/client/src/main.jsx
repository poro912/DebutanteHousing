import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store'; // store 파일 경로에 맞게 수정
import App from './App'; // App 파일 경로에 맞게 수정
import './index.css'; // 필요한 경우에만 import

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
