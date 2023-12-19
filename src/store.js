// store.js
import { createStore } from "redux";

const initialState = {
  date: "",
  numberOfPeople: 0,
  seats: [],
  names: [],
  phoneNumber: "",
  email: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.date };
    case "SET_NUMBER_OF_PEOPLE":
      return { ...state, numberOfPeople: action.numberOfPeople };
    case "SET_NAMES":
      return { ...state, names: action.names };
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.phoneNumber };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
