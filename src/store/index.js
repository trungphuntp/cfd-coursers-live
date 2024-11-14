import DogReducer from "@/reducers/DogReducers";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import CounterReducer from "@/reducers/CounterReducer";

const reducers = combineReducers({
    DogReducer,
    CounterReducer,
});

const middleWare = (store) => (next) => (action) => {
    if (typeof action === "function") {
        action(store.dispatch);
        return;
    }
    next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(middleWare)));

export default store;
