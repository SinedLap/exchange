import { takeEvery, call, put, takeLatest, delay } from 'redux-saga/effects'
import { REQUEST_PAYMENTS, 
        SET_PAYMENTS, 
        REQUEST_CONVERSION, 
        SET_AMOUNTS, 
        INPUT_LOADER, 
        RECOVER_INPUT_LOADER,
        POST_BID,
        BID_RESPONSE,
        BID_LOADER,
        ERRORS } from './types'

export default function* rootSaga () {
    yield takeEvery(REQUEST_PAYMENTS, getPayments)
    yield takeLatest(REQUEST_CONVERSION, getConversion)
    yield takeEvery(POST_BID, createBid)
}

function* getPayments() {
    const payload = yield call(fetchPayments)
    yield put({type: SET_PAYMENTS, payload})
}

async function fetchPayments() {
    return await fetch('https://involve.software/test_front/api/payMethods')
                            .then(res => res.json())
                            .catch(error => console.log(error))
}


function* getConversion(params) {
    const { base, value, queryString, invoicePayMethod, withdrawPayMethod } = params
    yield put({type: RECOVER_INPUT_LOADER})
    yield delay(500)
    yield put({type: INPUT_LOADER, base})
    const conversion = yield call(reciveConversion, queryString)
    if (!conversion.error) {
        const payload = {base, value, conversion, invoicePayMethod, withdrawPayMethod}
        yield put({type: SET_AMOUNTS, payload})
        yield put({type: INPUT_LOADER, base})
    } else {
        yield put({type: ERRORS, payload: 'whenConversion'})
    }
}

async function reciveConversion(queryString) {
        const response = await fetch(`https://involve.software/test_front/api/payMethods/calculate?${queryString}`)
                                .catch(error => ({ error }))
        return await response.json()
}

function* createBid(arg) {
    yield put({type: BID_LOADER})
    const payload = yield call(postBid, arg )
    if (!payload.error) {
        yield put({type: BID_RESPONSE, payload})
        yield put({type: BID_LOADER})
    } else {
        yield put({type: ERRORS, payload: 'whenConfirm'})
    }
    
}

async function postBid(arg) {
    const response = await fetch(`https://involve.software/test_front/api/bids?${arg.queryString}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg.params)
    }).catch(error => ({ error }))
    return await response.json()
}
