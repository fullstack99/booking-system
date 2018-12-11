/* eslint-disable flowtype/require-valid-file-annotation */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux'
import { and } from 'ramda'

import PrivateRoute from '../components/PrivateRoute';
import Admin from './admin';
import User from './user';

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch)

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notify: false,
      open: false,
    }
  }

  render() {
    const { user, location, isAuthenticated } = this.props;

    return (
      <React.Fragment>
        {
          (user && user.isAdmin )
            ? <Admin isAuthenticated={isAuthenticated}/>
            : <User />
        }
      </React.Fragment>

    )
  }
}

const mapStateToProps = ({
  notification: { message, level },
  auth: { token, user },
  router: { location },
}) => ({
  isAuthenticated: and(!!token, !!user),
  user,
  location,
  notificationMessage: message,
  notificationLevel: level,
})

export default compose(
  connect(mapStateToProps, null)
)(Index)

