import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { and } from 'ramda';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/admin/Layout';
import PrivateRoute from '../components/PrivateRoute';
import AdminAppointment from './admin/appointment';
import AdminUser from './admin/user';
import UserDetail from './admin/detail';
import AdminLocation from './admin/location';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch)

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Admin extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes, user, theme, isAuthenticated } = this.props;
    console.log('change url')
    return (
      <div className={classes.root}>
        <Layout />
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <PrivateRoute exact path="/admin" canAccess={isAuthenticated} component={AdminAppointment} />
              <PrivateRoute exact path="/admin/user" canAccess={isAuthenticated} component={AdminUser} />
              <PrivateRoute exact path="/admin/user/:userId" canAccess={isAuthenticated} component={UserDetail} />
              <PrivateRoute exact path="/admin/location" canAccess={isAuthenticated} component={AdminLocation} />
              <Redirect to='/admin'  />
            </Switch>

        </main>
      </div>
    );

  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles)
)(Admin)