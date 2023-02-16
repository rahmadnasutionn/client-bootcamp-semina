import {
    ERROR_FETCHING_LISTS_CATEGORIES,
    ERROR_FETCHING_LISTS_EVENTS,
    ERROR_FETCHING_LISTS_TALENTS,
    START_FETCHING_LISTS_CATEGORIES,
    START_FETCHING_LISTS_EVENTS,
    START_FETCHING_LISTS_TALENTS,
    SUCCESS_FETCHING_LISTS_CATEGORIES,
    SUCCESS_FETCHING_LISTS_EVENTS,
    SUCCESS_FETCHING_LISTS_TALENTS
} from './constant';

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
};

const initialState = {
    categories: [],
    statusCategories: statuslist.idle,
    talents: [],
    statusTalents: statuslist.idle,
    events: [],
    statusEvents: statuslist.idle,

};

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_LISTS_CATEGORIES:
            return {...state, statusCategories: statuslist.process };

        case SUCCESS_FETCHING_LISTS_CATEGORIES:
            return {...state, categories: action.categories, statusCategories: statuslist.success };

        case ERROR_FETCHING_LISTS_CATEGORIES:
            return {...state, statusCategories: statuslist.error };

        case START_FETCHING_LISTS_TALENTS:
            return {...state, statusTalents: statuslist.process };

        case SUCCESS_FETCHING_LISTS_TALENTS:
            return {...state, talents: action.talents, statusTalents: statuslist.success };

        case ERROR_FETCHING_LISTS_TALENTS:
            return {...state, statusTalents: statuslist.error };

        case START_FETCHING_LISTS_EVENTS:
            return {...state, statusEvents: statuslist.process };

        case SUCCESS_FETCHING_LISTS_EVENTS:
            return {...state, events: action.events, statusEvents: statuslist.success };

        case ERROR_FETCHING_LISTS_EVENTS:
            return {...state, statusEvents: statuslist.error };
        default:
            return state;
    }
}