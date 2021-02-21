import React, { Fragment } from 'react';
import './App.css';
import Landing from './layouts/Landing';
import Navbar from './layouts/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Hostel from './components/Hostel';
import Dashboard from './components/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/hostels' component={Hostel} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
      </Fragment>
    </Router>
  );
}

export default App;