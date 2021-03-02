import React, { Fragment } from 'react';
import './App.css';
import Landing from './layouts/Landing';
import Navbar from './layouts/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Hostel from './components/Hostel';
import Dashboard from './components/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import StepForm from './authentication/stepForm';
import Search from './search/Search';

const App = () => {
  return (
    <Router>
      <Fragment>
        {/* <Navbar /> */}
        <Route exact path='/' component={Landing} />
        <Route exact path='/signup' component={StepForm} />
        <Route exact path='/hostels' component={Hostel} />
        <Route exact path='/search' component={Search} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
      </Fragment>
    </Router>
  );
}

export default App;