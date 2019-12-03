import React from "react";
import ReactDOM from "react-dom";
import App from "../App.jsx";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "../config/fbConfig";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reactReduxFirebase(fbConfig), // redux binding for firebase
      reduxFirestore(fbConfig) // redux bindings for firestore
    )
  );
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
