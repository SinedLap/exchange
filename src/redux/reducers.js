import { SET_PAYMENTS, SET_AMOUNTS, INPUT_LOADER, RECOVER_INPUT_LOADER, BID_RESPONSE, BID_LOADER, RESET_MESSAGE, ERRORS } from './types'

const initialState = {
    paymentsMethods: {},
    paymentsAmount: {
        invoice: '',
        withdraw: ''
    },
    payMethods: {
        invoiceMethod: null,
        withdrawMethod: null
    },
    bid: {},
    loadingInputs: {
        invoice: false,
        withdraw: false
    },
    successBid: {
        loader: false,
        message: ''
    },
    hasError: {
        whenConversion: false,
        whenConfirm: false
    }
}

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAYMENTS:
            return {
                ...state,
                paymentsMethods: action.payload
            }
        case SET_AMOUNTS:
            if(action.payload.base === 'invoice') {
                return {
                    ...state,
                    payMethods: {
                        invoiceMethod: action.payload.invoicePayMethod,
                        withdrawMethod: action.payload.withdrawPayMethod,
                    },
                    paymentsAmount: {
                        invoice: action.payload.value,
                        withdraw: action.payload.conversion.amount
                    },
                    bid: {
                        ...state.bid,
                        amount: +action.payload.value, 
                        base: action.payload.base,
                        invoicePayMethod: action.payload.invoicePayMethod.id,
                        withdrawPayMethod: action.payload.withdrawPayMethod.id
                    }
                }
            } else {
                return {
                    ...state,
                    payMethods: {
                        invoiceMethod: action.payload.invoicePayMethod,
                        withdrawMethod: action.payload.withdrawPayMethod,
                    },
                    paymentsAmount: {
                        invoice: action.payload.conversion.amount,
                        withdraw: action.payload.value
                    },
                    bid: {
                        ...state.bid,
                        amount: +action.payload.value, 
                        base: action.payload.base,
                        invoicePayMethod: action.payload.invoicePayMethod.id,
                        withdrawPayMethod: action.payload.withdrawPayMethod.id
                    }
                }
            }
        case INPUT_LOADER:
            let base = action.base
            if(base === 'invoice') {
                base = 'withdraw'
            } else {
                base = 'invoice'
            }
            return {
                ...state,
                loadingInputs: {
                    ...state.loadingInputs,
                    [base]: !state.loadingInputs[base]
                }
            }
        case RECOVER_INPUT_LOADER: 
            return {
                ...state,
                loadingInputs: {
                    invoice: false,
                    withdraw: false
                }
            }
        case BID_LOADER: 
            return { 
                ...state,
                successBid: {
                    ...state.successBid,
                    loader: !state.successBid.loader
                }               
            }
        case BID_RESPONSE: 
            return {
                ...state,
                successBid: {
                    ...state.successBid,
                    message: action.payload.message
                }
            }
        case RESET_MESSAGE: 
            return {
                ...state,
                successBid: {
                    ...state.successBid,
                    message: ''
                }
            }
        case ERRORS: 
            return {
                ...state,
                hasError: {
                    ...state.hasError,
                    [action.payload]: false
                }
            }
        default:
            return state
    }
}

export default exchangeReducer