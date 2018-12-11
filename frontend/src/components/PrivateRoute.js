import React from 'react'
// import PropTypes from 'prop-types'

import { Redirect, Route } from 'react-router-dom'


const PrivateRoute = ({
  canAccess,
  component: Component,
  ...props,
}) => (
  <Route
    {...props}
    render={props =>
      canAccess
      ? <Component {...props} />
      : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location.pathname },
          }}
        />
      )
    }
  />
)

// TODO propTypes

export default PrivateRoute
