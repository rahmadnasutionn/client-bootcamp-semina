import { ERROR_FETCHING_TALENTS, START_FETCHING_TALENTS, SUCCESS_FETCHING_TALENTS, SET_KEYWORD } from "./constant";

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
};

const initialState = {
    data: [],
    keyword: '',
    status: statuslist.idle
};

export default function talentReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_TALENTS:
            return {...state, status: statuslist.process }

        case ERROR_FETCHING_TALENTS:
            return {...state, status: statuslist.error }

        case SUCCESS_FETCHING_TALENTS:
            return {...state, data: action.talents, status: statuslist.success }

        case SET_KEYWORD:
            return {...state, keyword: action.keyword }
        default:
            return state;
    }
}