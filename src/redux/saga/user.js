import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {triggerSimpleAjax} from '../../utils/httpHelper';
import {setUser} from '../reducer/user';

function* fetchUser(action) {
  try {
    const response = yield triggerSimpleAjax(
      'https://jsonplaceholder.typicode.com/posts',
      'GET',
    );
    yield put(
      setUser({
        loading: false,
        token: '',
        user: response[0],
      }),
    );
  } catch (e) {}
}

export function* watchUser() {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}
