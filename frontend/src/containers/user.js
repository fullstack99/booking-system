/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { and } from 'ramda'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import IconClose from '@material-ui/icons/Close'
import IconError from '@material-ui/icons/Error'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

// Dispatch
import { Creators as Actions } from '../actions'

// Components
import MaterialThemeWrapper from '../components/MaterialThemeWrapper'
import PrivateRoute from '../components/PrivateRoute'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/admin/Layout'

// Containers
import NotFound from './NotFound'
import Intro from './intro'
import CoolSpot from './coolSpot'
import Delivered from './delivered'
import Account from './account'
import Admin from './admin'
import Glasses from './glasses'
import Detail from './detail'
import Profile from './profile'
import Prescription from './prescription'
import Vision from './vision'
import Appointment from './appointment'
import PickDate from './pickDate'
import Forgot from './forgot'
import ResetPassword from './reset'
import ConfirmAppointment from './confirmAppointment'
import ConfirmRegister from './confirmRegister'
import CheckConfirmRegister from './checkConfirmRegister'
import GoodNews from './goodNews'

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch)

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    // NOTE temporary hide whole app in print mode
    '@media print': {
      display: 'none !important',
      visibility: 'hidden',
      height: 0,
    },
  },
  flex: {
    flex: 1,
  },
  frame: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  // iconMenu: {
  //   marginLeft: -12,
  //   marginRight: 10,
  // 	[theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   },
  // },
  container: {
    width: '100%',
  },
  snackbar: {
    flexWrap: 'nowrap',
  },
  notification: {
    display: 'flex',
    alignItems: 'center',
  },
  iconError: {
    marginRight: theme.spacing.unit,
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: 'black',
    width: 60,
    left: 0,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    color: 'white'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  'content-left': {
    [theme.breakpoints.down('xs')]: {
      marginLeft: -drawerWidth,
    },
    margin: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  list: {
    paddingLeft: 10
  }
})


class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notify: false,
      open: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notificationMessage !== nextProps.notificationMessage && nextProps.notificationMessage) {
      this.setState({
        notify: true
      })
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  navigate = to => {
    this.props.push(to)
  }

  closeNotification = () => {
    this.setState({
      notify: false,
    })
  }

  mobileNavigate(type) {
    if (type === 'login') {
      this.navigate('account');
    } else {
      this.props.logout();
    }
    this.handleDrawerClose();
  }

  render() {
    const {
      classes,
      notificationMessage,
      notificationLevel,
      clearNotification,
      isAuthenticated,
      logout,
      user
    } = this.props

    const { open } = this.state
    const { navigate } = this

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={'left'}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {isAuthenticated
          ? <List className={classes.list} onClick={() => this.mobileNavigate('logout')}>Logout</List>
          : <List className={classes.list} onClick={() => this.mobileNavigate('login')} >Login</List>
        }
        <Divider />
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.frame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-left`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <Hidden smUp>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Toolbar>
          </AppBar>

          <Hidden smUp>
            {drawer}
          </Hidden>

          <main className={classNames(classes.container, classes[`content-left`], {
            [classes.contentShift]: open,
            [classes[`contentShift-left`]]: open,
          })}>
          <Header {...{ isAuthenticated, logout, navigate, user }} />

            <ConnectedSwitch>
              <Route exact path="/" component={Intro} />
              <Route exact path="/coolspot" component={CoolSpot} />
              <Route exact path="/delivered" component={Delivered} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/pickdate" component={PickDate} />
              <Route exact path="/appointment" component={Appointment} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/reset" component={ResetPassword} />
              <Route exact path="/confirm-register/:token" component={CheckConfirmRegister} />
              <PrivateRoute exact path="/confirm-register" canAccess={isAuthenticated} component={ConfirmRegister} />
              <PrivateRoute exact path="/good-news" canAccess={isAuthenticated} component={GoodNews} />
              <PrivateRoute exact path="/confirmed/:token" canAccess={isAuthenticated} component={ConfirmAppointment} />
              <PrivateRoute exact path="/detail" canAccess={isAuthenticated} component={Detail} />
              <PrivateRoute exact path="/profile" canAccess={isAuthenticated} component={Profile} />
              <PrivateRoute exact path="/glasses" canAccess={isAuthenticated} component={Glasses} />
              <PrivateRoute exact path="/prescription" canAccess={isAuthenticated} component={Prescription} />
              <PrivateRoute exact path="/vision" canAccess={isAuthenticated} component={Vision} />
              <Route component={NotFound} />
              <Redirect to='/'  />
            </ConnectedSwitch>
            <Footer />
          </main>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.notify}
            autoHideDuration={3000}
            onClose={this.closeNotification}
            onExited={clearNotification}
            className={classes.snackbar}
            message={(
              <div className={classes.notification}>
                {notificationLevel && (notificationLevel === 'error') && (
                  <IconError
                    className={classes.iconError}
                    color="error"
                  />
                )}
                {notificationLevel && (notificationLevel === 'success') && (
                  <IconError
                    className={classes.iconError}
                    color="primary"
                  />
                )}
                {notificationMessage}
              </div>
            )}
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={this.closeNotification}
              >
                <IconClose />
              </IconButton>
            ]}
          />
        </div>
      </div>
    )
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
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

const {
  clearNotification,
  logout,
} = Actions

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  clearNotification,
  logout,
}, dispatch)

export default MaterialThemeWrapper(
  withRouter(compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(User))
)
