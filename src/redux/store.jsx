import { legacy_createStore as createStore, combineReducers, applyMiddleware ,compose } from "redux";
import thunk from "redux-thunk";

import authReducer from './auth/reducer';
import categoriesReducer from "./categories/reducer";
import eventReducer from "./events/reducer";
import listReducer from "./lists/reducer";
import notifReducer from "./notif/reducer";
import orderReducer from "./orders/reducer";
import paymentsReducer from "./payments/reducer";
import talentReducer from "./talents/reducer";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    notif: notifReducer,
    talents: talentReducer,
    payments: paymentsReducer,
    events: eventReducer,
    lists: listReducer,
    orders: orderReducer
 });

const store = createStore(
    rootReducer,
    composerEnhancer(applyMiddleware(thunk)),
);

export default store;