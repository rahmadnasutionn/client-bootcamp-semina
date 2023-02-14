import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import { clearNotif } from "../notif/actions";
import { ERROR_FETCHING_TALENTS, SET_KEYWORD, START_FETCHING_TALENTS, SUCCESS_FETCHING_TALENTS } from "./constant";

let debounceFetchTalents = debounce(getData, 1000);

export const startFetchingTalents = () => {
    return {
        type: START_FETCHING_TALENTS,
    }
};

export const successFetchingTalents = ({ talents }) => {
    return {
        type: SUCCESS_FETCHING_TALENTS,
        talents
    }
};

export const errorFetchingTalents = () => {
    return {
        type: ERROR_FETCHING_TALENTS
    }
};

export const fetchTalents = () => {
    return async(dispatch, getState) => {
        dispatch(startFetchingTalents());

        try {
            setTimeout(() => {
                dispatch(clearNotif())
            }, 2000)

            let params = {
                keyword: getState().talents.keyword,
            };

            let response = await debounceFetchTalents('/cms/talents', params);

            response.data.data.forEach((res) => {
                res.avatar = res.image.name
            });

            dispatch(successFetchingTalents({
                talents: response.data.data
            }))
        } catch (error) {
            dispatch(errorFetchingTalents());
        }
    }
}

export const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword,
    }
};