//import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  visible: false,
};

const NOTIFICATIONS_MESSAGES = {
  newAnecdote: "New anecdote created",
  newVote: "You have voted!",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ANECDOTE":
      return {
        ...state,
        message: NOTIFICATIONS_MESSAGES.newAnecdote,
        visible: true,
      };
    case "NEW_VOTE": {
      return {
        ...state,
        message: NOTIFICATIONS_MESSAGES.newVote,
        visible: true,
      };
    }
    case "CLOSE_NOTIFICATION": {
      return { ...state, visible: false };
    }
    default:
      return state;
  }
};

export const createAnecdoteNotification = () => {
  return {
    type: "CREATE_ANECDOTE",
  };
};

export const newVoteNotification = () => {
  return {
    type: "NEW_VOTE",
  };
};

export const closeNotification = () => {
  return {
    type: "CLOSE_NOTIFICATION",
  };
};

export default reducer;

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState,
//   reducers: {
//     createAnecodteNotification(state, action) {
//       return {
//         ...state,
//         message: NOTIFICATIONS_MESSAGES.newAnecdote,
//         visible: true,
//       };
//     },
//   },
//   newVoteNotification(state, action) {
//     return {
//       ...state,
//       message: NOTIFICATIONS_MESSAGES.newVote,
//       visible: true,
//     };
//   },
//   closeNotification(state, action) {
//     return { ...state, visible: false };
//   },
// });

// export const { createAnecdote, addVote, appendAnecdote, setAnecdote } =
//   notificationSlice.actions;
// export default notificationSlice.reducer;
