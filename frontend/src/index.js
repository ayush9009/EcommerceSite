import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { Provider } from "react-redux";
// import store from "./store"
import { Provider } from "react-redux";
import store from "./store"

// import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// const options = {
//   timeout: 5000,
//   positions: positions.BOTTOM_CENTER,
//   transition:transitions.SCALE,
// }
const options = {
  timeout: 2000,
  positions: positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
}

ReactDOM.render(
  <React.StrictMode>
    {/* const store=createStore(rootReducer); */}
    {/* <Provider store={store}> */}
    {/* <AlertProvider template={AlertTemplate} {...options}> */}
     {/* const store=createStore(rootReducer); */}
    <Provider store={store}>
     <AlertProvider template={AlertTemplate} {...options}>
    <App />
    {/* </AlertProvider> */}
    {/* </Provider>, */}
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// ReactDOM.render(
//   <StrictMode>
//     <Provider store={store}> {/* HERE */}
//       <App /> {/* Now, App is wrapped in Provider and hence can read from store */}
//     </Provider>
//   </StrictMode>,
//   document.getElementById('root')
// )


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// import { Provider } from "react-redux";
// import store from "./store"  maihun

// import { positions, transitions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

// const options = {
//   timeout: 5000,
//   positions: positions.BOTTOM_CENTER,
//   transition:transitions.SCALE,
// }

// ReactDOM.render(  mai hun
//   // <React.StrictMode>
//   // const store=createStore(rootReducer);
//     <Provider store={store}>
//       {/* <AlertProvider template={AlertTemplate} {...options}> */}
//       <App />
//       {/* </AlertProvider> */}
//     </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );