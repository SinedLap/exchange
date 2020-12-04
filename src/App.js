import React, { useEffect } from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Main from './pages/main';
import Approve from './pages/approve';
import Success from './pages/success';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from './redux/actions';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  grid: {
    height: '98vh'
  },
  paper: {
    margin: 'auto',
    padding: 32
  }
}))

export default function App() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPayments())
  }, [dispatch])

  const paymentsMethods = useSelector(state => state.paymentsMethods)

  if(!paymentsMethods.invoice) return <div><h1>Loading</h1></div>
  return(
    <BrowserRouter>
      <div className='App'>
        <Grid container className={classes.grid}>       
        <Paper className={classes.paper}>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/approve' component={Approve}/>
            <Route path='/success' component={Success}/>
            <Route path='*' exact component={Main}/>
          </Switch>
        </Paper>
        </Grid>
      </div>
    </BrowserRouter>
  )
}
