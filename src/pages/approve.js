import React from 'react'
import { Grid, Typography, Button, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { postBid } from '../redux/actions'
import { Link, Redirect } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    button: {
      width: 125,
      height: 48,
      borderRadius: 4,
      backgroundColor: '#58B4AE',      
      margin: 5,
      marginTop: 36,
      color: 'white',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 14,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#58B4AE'
      }
    },
    buttonCancel: {
        width: 125,
        height: 48,
        borderRadius: 4,
        color: '#3A3A3A',
        borderColor: '#58B4AE',      
        margin: 5,
        marginTop: 36,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#f3f3f3',
          borderColor: '#58B4AE'
        }
      },
    title: {
      fontSize: 48,
      fontWeight: 700,
      letterSpacing: '0em',
      textAlign: 'left',
      color: '#3A3A3A',
      marginBottom: 20
    },
    spinner: {
      position: 'relative',
      width: '20px !important',
      height: '20px !important',
      bottom: 52,
      left: 125
    },
    text: {
        color: '#3A3A3A'
    },
    action: {
        color: '#818181'
    }
  }))

export default function Approve() {
const classes = useStyles()
const paymentsAmount = useSelector(state => state.paymentsAmount)
const paymentMethods = useSelector(state => state.payMethods)
const bid = useSelector(state => state.bid)
const dispatch = useDispatch()
const createBid = () => {
    const queryString = Object.keys(bid).map(key => `${key}=${bid[key]}`).join('&')
    dispatch(postBid(bid, queryString))
}
const message = useSelector(state => state.successBid.message)
if(message === 'Success') return <Redirect to='/success'/>
return(
    <>
        <Grid container spacing={4} direction='row' >
            <Typography className={classes.title}>Details</Typography>
            <Grid item direction='row' justify="space-between" container>
                <Typography className={classes.action}>Sell</Typography>
                <Grid item>
                    <Typography className={classes.text}>{paymentsAmount.invoice} {paymentMethods.invoiceMethod.name}</Typography>
                </Grid>
            </Grid>
            <Grid item direction='row' justify="space-between" container>
                <Typography className={classes.action}>Buy</Typography>
                <Grid item>
                    <Typography className={classes.text}>{paymentsAmount.withdraw} {paymentMethods.withdrawMethod.name}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Link to='/'><Button variant='outlined' color='primary' className={classes.buttonCancel}>Cancel</Button></Link>
        <Button variant='contained' 
                color='primary' 
                className={classes.button} 
                onClick={createBid}
                disabled={message.loader}
        >
         Confirm
        </Button>
    </>
    )
}