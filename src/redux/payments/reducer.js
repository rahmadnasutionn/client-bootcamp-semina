import React from 'react'
import { ERROR_FETCHING_PAYMENTS, START_FETCHING_PAYMENTS, SUCCESS_FETCHING_PAYMENTS } from './constant';

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

export default function paymentsReducer(state = initialState, action) {
    switch (action.type) {
        case START_FETCHING_PAYMENTS:
            return {...state, status: statuslist.process }

        case SUCCESS_FETCHING_PAYMENTS:
            return {...state, status: statuslist.success, data: action.payments }

        case ERROR_FETCHING_PAYMENTS:
            return {...state, status: statuslist.error }
        default:
            return state;
    }
}