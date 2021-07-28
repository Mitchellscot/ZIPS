import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { emailConstants } from '../../_constants';

function* fetchEmailSettings() {
    try {
        const emailSettingsResponse = yield axios.get('/api/emailSettings');
        yield put({type: emailConstants.SET, payload: emailSettingsResponse.data[0]});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE EMAIL SETTINGS ${error}`);
    }
}

function* emailSettingsSaga() {
    yield takeEvery(emailConstants.FETCH, fetchEmailSettings);

  }

export default emailSettingsSaga;