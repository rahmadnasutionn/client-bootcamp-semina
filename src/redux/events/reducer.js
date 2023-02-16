import { ERROR_FETCHING_EVENTS, SET_CATEGORY, SET_KEYWORD, SET_TALENT, START_FETCHING_EVENTS, SUCCESS_FETCHING_EVENTS } from "./constant";

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
};

const initialState = {
    data: [],
    keyword: '',
    talent: '',
    category: '',
    status: statuslist.idle
};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_EVENTS:
            return {...state, status: statuslist.process }

        case SUCCESS_FETCHING_EVENTS:
            return {...state, status: statuslist.success, data: action.events }

        case ERROR_FETCHING_EVENTS:
            return {...state, status: statuslist.error }

        case SET_KEYWORD:
            return {...state, keyword: action.keyword }

        case SET_CATEGORY:
            return {...state, category: action.category }

        case SET_TALENT:
            return {...state, talent: action.talent }
        default:
            return state;
    }
}