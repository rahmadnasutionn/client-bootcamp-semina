import { ERROR_FETCHING_CATEGORIES, START_FETCHING_CATEGORIES, SUCCESS_FETCHING_CATEGORIES } from "./constant";

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
};

const initialState = {
    data: [],
    status: statuslist.idle,
};

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_CATEGORIES:
            return {
                ...state,
                status: statuslist.process,
            };

        case ERROR_FETCHING_CATEGORIES:
            return {
                ...state,
                status: statuslist.error,
            };

        case SUCCESS_FETCHING_CATEGORIES:
            return {
                ...state,
                status: statuslist.success,
                data: action.categories,
            };

        default:
            return state;
    }
}