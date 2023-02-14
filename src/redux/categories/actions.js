import { ERROR_FETCHING_CATEGORIES, START_FETCHING_CATEGORIES, SUCCESS_FETCHING_CATEGORIES } from "./constant"

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

let debouncedFetchCategories = debounce(getData, 1000);


export const startFetchingCategories = () => {
    return {
        type: START_FETCHING_CATEGORIES,
    }
};

export const successFetchingCategories = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_CATEGORIES,
        categories
    }
};

export const errorFetchingCategories = () => {
    return {
        type: ERROR_FETCHING_CATEGORIES,
    }
};

export const fetchCategories = () => {
    return async(dispatch) => {
        dispatch(startFetchingCategories());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 2000)

            const response = await debouncedFetchCategories('/cms/categories');

            dispatch(successFetchingCategories({
                categories: response.data.data
            }));
        } catch (err) {
            dispatch(errorFetchingCategories());
        }
    }
}