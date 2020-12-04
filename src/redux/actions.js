import { REQUEST_PAYMENTS, REQUEST_CONVERSION, POST_BID } from './types'

export function fetchPayments() {
    return {
        type: REQUEST_PAYMENTS
    }
} 

export function reciveConversion(base, value, queryString, invoicePayMethod, withdrawPayMethod) {
    return {
        type: REQUEST_CONVERSION,
        base,
        value,
        queryString,
        invoicePayMethod,
        withdrawPayMethod
    }
}

export function postBid(params, queryString) {
    return {
        type: POST_BID,
        params,
        queryString
    }
} 