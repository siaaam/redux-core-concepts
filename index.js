const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// action creator - simply a function which returns a object - action
function orderCake() {
  // action
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}
function restockCake(qty = 1) {
  return { type: CAKE_RESTOCKED, payload: qty };
}

function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  };
}

function restockIceCream(qty = 1) {
  return { type: ICECREAM_RESTOCKED, payload: qty };
}

const initialCakeState = {
  numOfCake: 10,
};
const initialIceCreamState = {
  numOfIceCream: 20,
};

// reducers
// (prevState, newState) => newState;

const iceCreamReducers = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

const cakeReduces = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCake: state.numOfCake + action.payload,
      };
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  cake: cakeReduces,
  iceCream: iceCreamReducers,
});

// store holding application state
const store = createStore(rootReducers);

console.log("initial state", store.getState());

// allow the app to change the store
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

// to change the state we must call dispatch and and action creator

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(3));
store.dispatch(orderIceCream());
store.dispatch(orderIceCream());
store.dispatch(orderIceCream());
store.dispatch(restockIceCream(5));

unsubscribe();
