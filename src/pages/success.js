import React from 'react'
import { Grid, Typography, Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useDispatch } from 'react-redux';
import { RESET_MESSAGE } from '../redux/types'

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
    title: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '0em',
      textAlign: 'center',
      color: '#3A3A3A',
      marginBottom: 20,
    },
    text: {
        color: '#3A3A3A'
    },
    icon: {
        width: 83,
        height: 91,
        color: '#58B4AE'
    }
  }))

export default function Success() {
    const classes = useStyles()
    const dispatch = useDispatch()
    dispatch({type: RESET_MESSAGE})
    return(
    <>
        <Grid container spacing={4} direction='column' alignItems="center">
            <Grid item>
                <VerifiedUserIcon className={classes.icon}/>
                <Typography className={classes.title}>Success!</Typography>
                <Typography className={classes.text}>
                  Your exchange order has been placed successfully and will be processed soon.
                </Typography>
            </Grid>
        </Grid>
        <Link to='/'><Button variant='contained' color='primary' className={classes.button}>Home</Button></Link>
    </>
    )
}