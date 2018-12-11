import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Logo from '../assets/logo.svg'

const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  container: {
    justifyContent: 'center',
    maxWidth: 1100,
    position: 'relative',
  },
  logo: {
    width: '100%',
    textAlign: 'center'
  },
  img: {
    width: 50
  },
  text: {
    width: '100%',
    textAlign: 'center',
    color: '#231f20',
    fontSize: 12,
    fontFamily: 'Raleway Regular'
  },
})


const Footer = ({
  classes,
}) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={Logo} className={classes.img} alt='logo'/>
      </div>
      <Typography variant="body1" className={classes.text}>WILL GRANT VISION FOUNDATION IS A 501C3 FOR-PURPOSE.ORG</Typography>
    </div>
  </div>
)

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Footer)
