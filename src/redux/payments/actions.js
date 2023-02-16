import debounce from 'debounce-promise';
import { getData } from '../../utils/fetch';
import { clearNotif } from '../notif/actions';
import {
    ERROR_FETCHING_PAYMENTS,
    START_FETCHING_PAYMENTS,
    SUCCESS_FETCHING_PAYMENTS,
} from './constant';

let debouncedFetchPayments = debounce(getData, 1000);

export const startFetchingPayments = () => {
    return {
        type: START_FETCHING_PAYMENTS
    }
};

export const successFetchingPayments = ({ payments }) => {
    return {
        type: SUCCESS_FETCHING_PAYMENTS,
        payments
    };
};

export const errorFetchingPayments = () => {
    return {
        type: ERROR_FETCHING_PAYMENTS
    };
};

export const fetchPayments = () => {
    return async(dispatch) => {
        dispatch(startFetchingPayments());

        try {
            setTimeout(() => {
                dispatch(clearNotif());
            }, 2000);

            const response = await debouncedFetchPayments('/cms/payments');

            response.data.data.forEach((res) => {
                res.avatar = res.image.name;
            });

            dispatch(successFetchingPayments({
                payments: response.data.data
            }));
        } catch (error) {
            dispatch(errorFetchingPayments());
        }
    }
}