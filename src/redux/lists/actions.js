import debounce from 'debounce-promise';
import { getData } from '../../utils/fetch';
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

let debouncedListCategories = debounce(getData, 1000);
let debouncedListEvents = debounce(getData, 1000);
let debouncedListTalents = debounce(getData, 1000);

export const startFetchingListCategories = () => {
    return {
        type: START_FETCHING_LISTS_CATEGORIES,
    };
};

export const successFetchingListCategories = ({ categories }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_CATEGORIES,
        categories
    };
};

export const errorFetchingListCategories = () => {
    return {
        type: ERROR_FETCHING_LISTS_CATEGORIES,
    };
};

export const fetchListCategories = () => {
    return async(dispatch) => {
        dispatch(startFetchingListCategories());

        try {
            let response = await debouncedListCategories('/cms/categories');

            let _temp = [];

            response.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: 'category' }
                });
            });

            dispatch(successFetchingListCategories({
                categories: _temp,
            }));
        } catch (error) {
            dispatch(errorFetchingListCategories());
        }
    };
};

export const startFetchingListTalents = () => {
    return {
        type: START_FETCHING_LISTS_TALENTS,
    };
};

export const successFetchingListTalents = ({ talents }) => {
    return {
        type: SUCCESS_FETCHING_LISTS_TALENTS,
        talents
    };
};

export const errorFetchingListTalents = () => {
    return {
        type: ERROR_FETCHING_LISTS_TALENTS,
    };
};

export const fetchListTalents = () => {
    return async(dispatch) => {
        dispatch(startFetchingListCategories());

        try {
            let response = await debouncedListTalents('/cms/talents');

            let _temp = [];

            response.data.data.forEach((res) => {
                _temp.push({
                    value: res._id,
                    label: res.name,
                    target: { value: res._id, name: 'talent' }
                });
            });

            dispatch(successFetchingListTalents({
                talents: _temp
            }));
        } catch (error) {
            dispatch(errorFetchingListTalents);
        }
    };
}