import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
// Material UI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1100,
    marginTop: 25,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      marginTop: 5,
    },
  },
  logo: {
    padding: '15px 0',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    wordSpacing: 3,
    letterSpacing: 2,
    width: 240,
    cursor: 'pointer',
  },
  first: {
    color: '#bdf7fb',
    fontFamily: 'Raleway SemiBold'
  },
  second: {
    fontFamily: 'Raleway SemiBold'
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    color: '#a6ccd0',
    textTransform: 'none',
    fontSize: 15,
    minHeight: 15,
    fontWeight: 300,
    padding: 0,
    fontFamily: 'Raleway Regular'
  },
  item: {
    fontFamily: 'Raleway Regular',
    color: '#303031'
  }
})


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.goProfile = this.goProfile.bind(this);
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.setState({ anchorEl: null });
    this.props.logout();
    this.props.navigate('/account');
  }

  goProfile() {
    const { user } = this.props;
    console.log('user', user);
    this.setState({ anchorEl: null });
    if (user && user.isConfirm) {
      this.props.navigate('/detail');
    }
  }

  goHello = () => {
    const { token, reschedule, userAppointment, user } = this.props;
    console.log('token', token)
    console.log('reschedule', reschedule)
    console.log('userAppointment', userAppointment)
    console.log('user', user)
    if (token && !reschedule && userAppointment && user && user.isConfirm) {
      this.setState({ anchorEl: null });
      this.props.navigate('/good-news');
    } else if (token && !reschedule && !userAppointment && user && user.isConfirm) {
      this.props.navigate('/');
    } else if (!user) {
      this.props.navigate('/');
    } else if (token && reschedule && userAppointment && user && user.isConfirm) {
      this.props.navigate('/');
    }
  }

  render() {
    const { classes, navigate, isAuthenticated, user } = this.props
    const { anchorEl } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.logo} onClick={this.goHello}>
            <span className={classes.first}>ON DEMAND</span>
            <span className={classes.second}> EYE EXAM</span>
          </div>
          <Hidden xsDown>
            <div className={classes.buttons}>
              {isAuthenticated
                ? <div>
                  <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    className={classes.button}
                    onClick={this.handleClick}
                  >
                    {user.firstName} {user.lastName}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem className={classes.item} onClick={this.goProfile}>Profile</MenuItem>
                    <MenuItem className={classes.item} onClick={this.logout}>Log out</MenuItem>
                  </Menu>
                </div>
                : <Button className={classes.button} onClick={() => navigate('/account')}>Login</Button>
              }
            </div>
          </Hidden>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({
  auth: { token, user, userAppointment },
  user: { reschedule }
}) => ({
  user,
  userAppointment,
  token,
  reschedule
})

export default compose(
  withStyles(styles), connect(mapStateToProps, null)
)(Header)
