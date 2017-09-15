import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Settings from "./Settings";
import configureStore from "./configureStore";
import DevTools from "./DevTools";
import { isBackupOn } from "./reducer";
import { startBackup, stopBackup } from "./backup";

const styles = {
  fontFamily: "sans-serif"
};

const store = configureStore();
if (isBackupOn(store.getState())) {
  startBackup();
}
if (window.Worker) {
  console.log("working with Web Worker");
  const worker = new Worker("backup-worker.js");
  store.subscribe(() => {
    console.log("global state changed: ", store.getState());
    if (isBackupOn(store.getState())) {
      worker.postMessage({ cmd: "start" });
    } else {
      worker.postMessage({ cmd: "stop" });
    }
  });
} else {
  store.subscribe(() => {
    console.log("global state changed: ", store.getState());
    if (isBackupOn(store.getState())) {
      startBackup();
    } else {
      stopBackup();
    }
  });
}

const App = () => (
  <div style={styles}>
    <Settings />
    <DevTools />
  </div>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
