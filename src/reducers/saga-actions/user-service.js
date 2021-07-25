import types from '../types/types';


export const getAccount = (params, onSuccess, onError) => ({
    type: types.BE_GET_USER_INFO,
    params,
    onSuccess,
    onError
})

export const createAccount = (params, onSuccess, onError) => ({
    type: types.BE_CREATE_USER_INFO,
    params,
    onSuccess,
    onError
})

export const updateAccount = (params, onSuccess, onError) => ({
    type: types.BE_UPDATE_USER_INFO,
    params,
    onSuccess,
    onError
})

export const logOutUser = (params, onSuccess, onError) => ({
    type: types.BE_LOG_OUT,
    params,
    onSuccess,
    onError
})

export default {
    getAccount,
    createAccount,
    updateAccount,
    logOutUser
};
