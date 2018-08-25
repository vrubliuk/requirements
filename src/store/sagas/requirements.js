import { delay } from "redux-saga";
import { put, select  } from "redux-saga/effects";
import * as actionCreators from "../actions/actionCreators";
import * as API from "../utility/API";

export function* addRequirement(action) {
  const state = yield select()
  try {
    const res = yield API.postRequirement(state.auth.token, action.сustomer, action.documentation, action.releaseSheetLink, action.releaseSheetAE);
    yield console.log(res.data);
    
    // yield (localStorage.refreshToken = res.data.refreshToken);
    // yield put(actionCreators.setToken(res.data.idToken));
    // yield put(actionCreators.showInModal(null));
  } catch (err) {
    // yield put(actionCreators.toggleError());
    // yield delay(2000);
    // yield put(actionCreators.toggleError());
  }
}
