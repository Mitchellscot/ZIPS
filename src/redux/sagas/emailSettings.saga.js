import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* fetchEmailSettings() {
    try {
        const emailSettingsResponse = yield axios.get('/api/email');
        yield put({type: 'SET_EMAIL_SETTINGS', payload: emailSettingsResponse.data});
    }
    catch (error){
        console.log(`HEY MITCH - COULDN'T GET THE EMAIL SETTINGS ${error}`);
    }
}

function* emailSettingsSaga() {
    yield takeEvery('FETCH_EMAIL_SETTINGS', fetchEmailSettings);

  }

export default emailSettingsSaga;