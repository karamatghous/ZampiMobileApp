import { all } from 'redux-saga/effects';
import {
    watchCreateUser,
    watchUpdateUser,
    watchGetUser,
    watchLogOut
} from './userServiceSagas';

function* rootSaga() {
    yield all([
        watchCreateUser(),
        watchGetUser(),
        watchUpdateUser(),
        watchLogOut()
    ])
}
export default rootSaga