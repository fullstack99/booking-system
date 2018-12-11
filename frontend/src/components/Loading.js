import React from 'react'
import PropTypes from 'prop-types'

import { join } from 'ramda'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  loading: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // background: `rgba(${theme.palette.background.default}, .7)`,
    background: 'rgba(38, 50, 56, .7)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixed: {
    position: 'fixed',
    paddingTop: 56,
  [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
  },
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: {
    paddingLeft: theme.drawerWidth,
  },
  },
  absolute: {
    position: 'absolute',
  },
  icon: {
    marginBottom: theme.spacing.unit,
  }
})


const Loading = ({
  classes,
  variant,
  message,
}) => (
  <div
    className={join(' ', [classes.loading, classes[variant]])}
    style={{ position: variant }}
  >
  <CircularProgress className={classes.icon} size={32} thickness={1} />
    <Typography variant="body1">{message}</Typography>
  </div>
)

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['fixed', 'absolute']),
  message: PropTypes.string.isRequired,
}

Loading.defaultProps = {
  variant: 'fixed',
  message: 'Loading...',
}

export default withStyles(styles)(Loading)
