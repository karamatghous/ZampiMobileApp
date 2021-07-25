import { customApi } from './backend-api';

export const createAccount = (params) => {
    return customApi.post(`/api/create_user/${params.userId}`, params.data);
}

export const getAccount = (params) => {
    return customApi.get(`/api/user/${params.userId}`);
}

export const updateAccount = (params) => {
    return customApi.put(`/api/v1/update_account/${params.userId}`, params.data);
}

export const logOut = (params) => {
    return customApi.post(`/api/v1/user/${params.userId}/logout`, params.data);
}