import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  flexCenter: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  message: {
    fontSize: theme.typography.headline.fontSize,
  },
})


const Empty = ({ classes, message }) => (
  <div className={classes.flexCenter}>
    <Typography
      className={classes.message}
      variant="body1"
      align="center"
    >
      {message}
    </Typography>
  </div>
)

Empty.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
}

Empty.defaultProps = {
  message: 'No data.',
}

export default withStyles(styles)(Empty)
