import { ERROR_FETCHING_ORDERS, SET_DATE, SET_PAGE, START_FETCHING_ORDERS, SUCCESS_FETCHING_ORDERS } from "./constant";

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
};

const initialState = {
    data: [],
    status: statuslist.idle,
    page: 1,
    limit: 1,
    pages: 1,
    date: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_ORDERS:
            return {...state, status: statuslist.process };

        case SUCCESS_FETCHING_ORDERS:
            return {...state, data: action.orders, status: statuslist.success, pages: action.pages };

        case ERROR_FETCHING_ORDERS:
            return {...state, status: statuslist.error };

        case SET_DATE:
            return {...state, page: action.page }

        case SET_PAGE:
            return {...state, date: action.ranges };
        default:
            return state;
    }
}