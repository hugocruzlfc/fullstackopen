import { createContext, useReducer } from "react";

const initialState = {
  message: "",
};

const notificationReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return { ...state, message: action.payload };
    case "CLOSE_NOTIFICATION":
      return { ...state, message: "" };
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
