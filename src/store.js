// store.js
import { createStore } from "redux";

const initialState = {
  date: "",
  numberOfPeople: 0,
  seats: [],
  names: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.date };
    case "SET_NUMBER_OF_PEOPLE":
      return { ...state, numberOfPeople: action.numberOfPeople };
    case "SET_NAMES":
      return { ...state, names: action.names };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
