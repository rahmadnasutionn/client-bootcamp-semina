import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import { ERROR_FETCHING_EVENTS, SET_CATEGORY, SET_KEYWORD, SET_TALENT, START_FETCHING_EVENTS, SUCCESS_FETCHING_EVENTS } from "./constant"

let debouncedFetchEvents = debounce(getData, 1000);

export const startFetchingEvent = () => {
    return {
        type: START_FETCHING_EVENTS,
    };
};

export const successFetchingEvent = ({ events }) => {
    return {
        type: SUCCESS_FETCHING_EVENTS,
        events
    };
};

export const errorFetchingEvent = () => {
    return {
        type: ERROR_FETCHING_EVENTS,
    };
};

export const fetchEvents = () => {
    return async(dispatch, getState) => {
        dispatch(startFetchingEvent());


        try {
            setTimeout(() => {
                dispatch(clearNotif())
            }, 2000)

            let params = {
                keyword: getState().events.keyword,
                category: getState().events?.category?.value || '',
                talent: getState().events?.talents?.value || ''
            };

            const response = await debouncedFetchEvents('/cms/events', params);

            response.data.data.forEach((res) => {
                res.categoryName = res?.category?.name ?? '',
                    res.talentName = res?.talent?.name ?? '-'
            });

            dispatch(successFetchingEvent({
                events: response.data.data
            }));

        } catch (error) {
            dispatch(errorFetchingEvent());
        }

    };
};

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword
    };
};

export const setCategory = (category) => {
    return {
        type: SET_CATEGORY,
        category
    };
};

export const setTalent = (talent) => {
    return {
        type: SET_TALENT,
        talent
    };
};