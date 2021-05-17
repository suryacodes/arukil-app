import {all} from '@redux-saga/core/effects';
import {watchUser} from './user';

function* rootSaga() {
  yield all([watchUser()]);
}

export default rootSaga;
