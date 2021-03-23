import {combineReducers, createStore} from "redux";
import dashboardReducer from "./dashboardReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
    dashboardReducer
})

const store = createStore(reducers, composeWithDevTools())

console.log(Window.state = store.getState())

export default store
