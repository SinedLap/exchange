import React from 'react'
import '../App.css';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { BootstrapInput } from '../styledComponents'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { reciveConversion } from '../redux/actions'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '98vh'
  },
  paper: {
    margin: 'auto',
    padding: 32
  },
  button: {
    width: 125,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#58B4AE',
    marginTop: 20,
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#58B4AE'
    },
    '&:disabled': {
      backgroundColor: '#58B4AE'
    }
  },
  input: {
    width: 313,
    marginBottom: 20,
  },
  selectIcon: {
    paddingRight: 20,
    color: '#3A3A3A'   
  },
  selectIconOpen: {
    paddingLeft: 20,
    color: '#58B4AE' 
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#3A3A3A',
    marginBottom: 20
  },
  inputWrapper: {
    maxWidth: 313,
    maxHeight: 65
  },
  spinner: {
    position: 'relative',
    width: '20px !important',
    height: '20px !important',
    bottom: 52,
    left: 125
  }
}))

export default function Main() {
  const dispatch = useDispatch()
  const history = useHistory()
  const paymentsMethods = useSelector(state => state.paymentsMethods)
  const paymentsAmount = useSelector(state => state.paymentsAmount)
  const activeMethods = useSelector(state => state.payMethods)
  const loader = useSelector(state => state.loadingInputs)
  const conversionError = useSelector(state => state.hasError)
  const classes = useStyles()
  const [methods, setMethods] = useState({
    invoicePayMethod: paymentsMethods.invoice[0],
    withdrawPayMethod: paymentsMethods.withdraw[1],
  })
  const [amounts, setAmounts] = useState({
    invoice: '',
    withdraw: ''
  })

  useEffect(() => {
    setAmounts({
      withdraw: paymentsAmount.withdraw,
      invoice: paymentsAmount.invoice
    })
  }, [paymentsAmount])

  const newAmount = (base, value) => {
    setAmounts({
      ...amounts,
      [base]: value
    })
  }

  const amountsHandler = (base, value) => {
    if(value < 1) {
      setAmounts({
        invoice: '',
        withdraw: ''
      })
    } else {
      conversion(base, value)
      newAmount(base, value) 
    }   
  }
  const paymentsHandler = (base, chosenMethodId) => {
    const takePayMethod = paymentsMethods[base].filter(item => item.id === chosenMethodId)
    if(base === 'invoice') {
      let invoicePayMethod = takePayMethod[0]
      conversion(base, null, invoicePayMethod, null)
      setMethods({
        ...methods,
        invoicePayMethod
      })  
    } else {
      let withdrawPayMethod = takePayMethod[0]
      conversion(base, null, null, withdrawPayMethod)
      setMethods({
        ...methods,
        withdrawPayMethod
      }) 
    }   
  }

  const conversion = (base, value, invoicePayMethod, withdrawPayMethod) => {
    let params = {
      base,
      amount: value || amounts[base],
      invoicePayMethod: invoicePayMethod ? invoicePayMethod.id : methods.invoicePayMethod.id,
      withdrawPayMethod: withdrawPayMethod ? withdrawPayMethod.id : methods.withdrawPayMethod.id
    }
    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
    dispatch(reciveConversion(base, 
                              params.amount, 
                              queryString, 
                              invoicePayMethod || methods.invoicePayMethod, 
                              withdrawPayMethod || methods.withdrawPayMethod
                              ))
  }
  
return (
  <>
  {!paymentsMethods.invoice || !paymentsMethods.withdraw ? <h1>LOADING</h1> : (
    <>
        <Grid container spacing={4} direction='row'>
              <Grid item xs direction='column' container>
                <Typography className={classes.title}>Sell</Typography>
                  <Select value={activeMethods.invoiceMethod ? activeMethods.invoiceMethod.id : methods.invoicePayMethod.id}
                          input={<BootstrapInput />} 
                          className={classes.input} 
                          classes={{
                              icon: classes.selectIcon,
                              iconOpen: classes.selectIconOpen
                          }}
                          onChange={e => paymentsHandler('invoice', e.target.value)}
                  >
                    {paymentsMethods.invoice.map(method => <MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>)}
                  </Select>
                  <div className={classes.inputWrapper}>
                    <BootstrapInput type='number'
                                    min='0'
                                    value={amounts.invoice}
                                    className={classes.input}  
                                    onChange={e => {amountsHandler('invoice', e.target.value)}}
                                    disabled={loader.invoice}
                    />
                  {loader.invoice ? <CircularProgress className={classes.spinner}/> : null }
                  </div>
              </Grid>

              <Grid item xs direction='column' container>
                <Typography className={classes.title}>Buy</Typography>
                <Select value={activeMethods.withdrawMethod ? activeMethods.withdrawMethod.id : methods.withdrawPayMethod.id}
                        input={<BootstrapInput />} 
                        className={classes.input} 
                        classes={{
                          root: classes.select,
                          icon: classes.selectIcon,
                          iconOpen: classes.selectIconOpen
                        }}
                        onChange={e => paymentsHandler('withdraw', e.target.value )}
                >
                  {paymentsMethods.withdraw.map(method => <MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>)}
                </Select>
                <div className={classes.inputWrapper}>
                  <BootstrapInput type='number'
                                  min='0'
                                  value={amounts.withdraw}
                                  className={classes.input} 
                                  onChange={e => amountsHandler('withdraw', e.target.value)}
                                  disabled={loader.withdraw}
                  />
                  {loader.withdraw ? <CircularProgress className={classes.spinner}/> : null }
                </div>
              </Grid>
            </Grid>
            {conversionError.whenConversion? <p>Request has error, try again.</p> : (
            <Button variant='contained' 
              color='primary' 
              className={classes.button}
              disabled={!paymentsAmount.invoice || !paymentsAmount.withdraw}
              onClick={() => history.push('/approve')}
            >
              Exchange
            </Button>
            )}

    </>
 )}
 </>
  );
}

