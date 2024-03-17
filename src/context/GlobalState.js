import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  connect: false,
  name: "",
  username: "",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const updateConnect = (_connect) => {
    dispatch({ type: "UPDATE_CONNECT", payload: _connect });
  };

  const updateName = (_name) => {
    dispatch({ type: "UPDATE_NAME", payload: _name });
    console.log(_name);
  };

  const updateUsername = (_username) => {
    dispatch({ type: "UPDATE_USERNAME", payload: _username });
  };

  return (
    <GlobalContext.Provider
      value={{
        connect: state.connect,
        name: state.name,
        username: state.username,
        updateConnect,
        updateName,
        updateUsername,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
