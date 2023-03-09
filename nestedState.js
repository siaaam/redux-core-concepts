const { createStore } = require("redux");
const produce = require("immer").produce;

// initial state
const initialState = {
  name: "siam",
  address: {
    street: "Dhanmondi 4/a",
    city: "Dhaka",
    country: "Bangladesh",
  },
};

// action creator returns the action object
const STREET_UPDATED = "STREET_UPDATED";
function updateStreet(street) {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);

store.dispatch(updateStreet("dhunat, bogra"));
unsubscribe();
