import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' //Providerom obuhvatimo cejelu app
import store from './store' //provider koristi store u kojem su glob. states i funkcionalnosti
import './bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
