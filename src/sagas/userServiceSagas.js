import { call, put, takeEvery } from 'redux-saga/effects';
import types from '../reducers/types/types';
import * as userServiceApis from '../services/user-service';
import { userAccountStoreActions } from '../reducers/auth/all-actions';
import firebase from '@react-native-firebase/app';
import setLoader from '../reducers/loader/actions';
import { strings } from '../utils/strings';
import * as RNLocalize from "react-native-localize";

export function* createUser(action) {
    try {
        yield put(setLoader({ isLoading: true, message: strings['LoaderCreatingAccount'] }));
        action.params.data.timezone = RNLocalize.getTimeZone();
        action.params.data.offset = new Date().getTimezoneOffset();
        const data = yield call(userServiceApis.createAccount, action.params);
        yield put(setLoader(null));
        if (data.status != 200) {
            if (data.status == 404) {
                yield put(userAccountStoreActions.removeUser());
                if (firebase.auth() && firebase.auth().currentUser) {
                    firebase.auth().signOut().then(function () {
                        return action.onError(data.data.data);
                    });
                } else {
                    return action.onError(data.data.data);
                }
            } else {
                return action.onError(data.data.data || data.data.problem);
            }
        } else {
            action.onSuccess(data.data.data);
            yield put(userAccountStoreActions.setUser(data.data.data));
        }
    } catch (error) {
        yield put(setLoader(null));
        action.onError(error);
    }
}

export function* watchCreateUser() {
    yield takeEvery(types.BE_CREATE_USER_INFO, createUser);
}

export function* getUser(action) {
    try {
        if (action && action.params && action.params.background != true)
            yield put(setLoader({ isLoading: true, message: strings['LoaderValidatingAccount'] }));
        const getUserResponse = yield call(userServiceApis.getAccount, action.params);
        if (action && action.params && action.params.background != true)
            yield put(setLoader(null));
        if (getUserResponse.status != 200) {
            if (getUserResponse.status == 404 || getUserResponse.status == 400 || getUserResponse.status == 403) {
                yield put(userAccountStoreActions.removeUser());
                if (firebase.auth() && firebase.auth().currentUser) {
                    firebase.auth().signOut().then(function () {
                        return action.onError(getUserResponse.data);
                    });
                } else {
                    return action.onError(getUserResponse.data.data);
                }
            } else {
                return action.onError(getUserResponse.data.data);
            }
        }
        else {
            yield put(userAccountStoreActions.setUser(getUserResponse.data.data));
            return action.onSuccess(getUserResponse.data.data);
        }
    } catch (error) {
        if (action && action.params && action.params.background != true)
            yield put(setLoader(null));
        action.onError(error);
    }
}

export function* watchGetUser() {
    yield takeEvery(types.BE_GET_USER_INFO, getUser);
}

export function* updateUser(action) {
    try {
        if (action && action.params && action.params.background != true)
            yield put(setLoader({ isLoading: true, message: strings['LoaderUpdatingAccount'] }));
        action.params.data.timezone = RNLocalize.getTimeZone();
        action.params.data.offset = new Date().getTimezoneOffset();
        const updateUserResponse = yield call(userServiceApis.updateAccount, action.params);
        if (action && action.params && action.params.background != true)
            yield put(setLoader(null));
        if (updateUserResponse.status != 200) {
            return action.onError(updateUserResponse.data.data);
        }
        yield put(userAccountStoreActions.setUser(updateUserResponse.data.data));
        action.onSuccess(updateUserResponse.data.data);
    } catch (error) {
        if (action && action.params && action.params.background != true)
            yield put(setLoader(null));
        action.onError(error);
    }
}

export function* watchUpdateUser() {
    yield takeEvery(types.BE_UPDATE_USER_INFO, updateUser);
}

export function* logOutUser(action) {
    try {
        if (action && action.params && action.params.background != true)
            yield put(setLoader({ isLoading: true, message: strings['LoaderLogOut'] }));
        const logOutResponse = yield call(userServiceApis.logOut, action.params);
        if (logOutResponse.status != 200) {
            if (action && action.params && action.params.background != true)
                yield put(setLoader(null));
            return action.onError(logOutResponse.data);
        }
        action.onSuccess(logOutResponse.data);
    } catch (error) {
        if (action && action.params && action.params.background != true)
            yield put(setLoader(null));
        action.onError(error);
    }
}

export function* watchLogOut() {
    yield takeEvery(types.BE_LOG_OUT, logOutUser);
}