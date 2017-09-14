import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import axios from 'axios';

import Container from './container.js'
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import QuickBuy from './views/Exchange/QuickBuy'
// import Trade from './views/Dashboard/Trade'
// import Account from './views/Dashboard/Account'
import Account from './views/Account'
import Deposit from './views/Deposit/Deposit'
import Withdraw from './views/Withdraw/Withdraw'
import Login from './views/Auth/Login'
import SignUp from './views/Auth/Signup'
import Verification from './views/Auth/Verification'
import ResetPassword from './views/Auth/ResetPassword'
import ResetPasswordRequest from './views/Auth/ResetPasswordRequest'
import Exchange from './views/Exchange'
import Bitcoin from './views/Exchange/Bitcoin'
import UserVerification from './views/UserVerification'
import CustomerSupport from './views/UserVerification/CustomerSupport'
import store from './store'
import { setToken } from './actions/authAction'
import constants from './config/constants'

// Initialize token
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = constants.API_URL;


let token = localStorage.getItem('token')
if(token) {
  store.dispatch(setToken(token))
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function isLoggedIn() {
  let token = localStorage.getItem('token')
  if(token) {
    return true
  }
  else {
    return false
  }
}

function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

function loggedIn(nextState, replace) {
  if (isLoggedIn()) {
    replace({
      pathname: '/dashboard'
    })
  }
}

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Container}>
      <IndexRoute component={Home} />
      <Route path="dashboard" name="Dashboard" component={Dashboard} onEnter={requireAuth}>
        <IndexRoute component={Account}/>
        <Route path="exchange" name="Exchange" component={Exchange}>
          <IndexRoute component={Bitcoin}/>
          <Route path="btc" name="Bitcoin" component={Bitcoin} />
          <Route path="quickbuy" name="QuickBuy" component={QuickBuy}/>
        </Route>
        <Route path="account" name="Account" component={Account}/>
        <Route path="deposit" name="Deposit" component={Deposit}/>
        <Route path="withdraw" name="Withdraw" component={Withdraw}/>
        <Route path="verification" name="UserVerification" component={UserVerification} />
        <Route path="support" name="support" component={CustomerSupport} />
         <Route path="verification/:level" name="verifyCode" component={UserVerification}></Route>
      </Route>
      <Route path="login" name="Login" component={Login} onEnter={loggedIn}/>
      <Route path="signup" name="signup" component={SignUp} onEnter={loggedIn} />
      <Route path="reset-password" name="Reset Password Request" component={ResetPasswordRequest} onEnter={loggedIn}/>
      <Route path="reset-password/:code" name="Reset Password" component={ResetPassword} onEnter={loggedIn}/>
      <Route path="verify" name="Verify" component={Verification} />
      <Route path="verify/:code" name="verifyCode" component={Verification}></Route>
      
    </Route>
  </Router>
)