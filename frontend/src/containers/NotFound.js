import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconError from '@material-ui/icons/Error'


const styles = theme => ({
  flexCenter: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    display: 'block',
    width: 64,
    height: 64,
    opacity: 0.5,
    marginBottom: theme.spacing.unit * 3,
  },
})


const NotFound = ({ classes }) => (
  <div className={classes.flexCenter}>
    <IconError className={classes.icon} color="action" />
    <Typography variant="headline" align="center" gutterBottom>
      {'This page does not exist.'}
    </Typography>
  </div>
)

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NotFound)
