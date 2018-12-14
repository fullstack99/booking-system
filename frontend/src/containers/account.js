import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { and } from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'
import { Link } from 'react-router-dom';
import { Creators as Actions } from '../actions'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress';

// Components

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20,
    width: '100%',
    minHeight: 'calc(100% - 156px)',
    [theme.breakpoints.down('md')]: {
      marginTop: 20,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 800,
    position: 'relative',
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '30px 0',
    textAlign: 'center',
    borderBottom: '3px solid #cfe1e3',
  },
  title: {
    fontSize: 40,
    color: '#757575',
    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },
    fontFamily: 'Raleway Thin'
  },
  link: {
    lineHeight: 2,
    fontSize: 12,
    color: '#8bb4c2',
    marginTop: 40,
    fontFamily: 'Raleway ExtraLight'
  },
  contents: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 'calc(100vh - 370px)',
  },
  grid: {
    margin: '100px 0',
    backgroundColor: '#cfe1e3',
    [theme.breakpoints.down('md')]: {
      margin: '50px 0',
    },
  },
  gridx: {
    padding: '25px',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
    },
  },
  formTitle: {
    width: '100%',
    fontSize: 30,
    color: '#717171',
    textAlign: 'center',
    fontFamily: 'Raleway Thin'
  },
  formControl: {
    margin: '10px 0',
    width: '100%',
  },
  formLabel: {
    color: '#303031 !important',
    fontFamily: 'Raleway SemiBold'
  },
  formInput: {
    color: '#717171',
    "&:before": {
      borderColor: '#717171'
    },
    "&:after": {
      borderColor: '#717171'
    },
    fontFamily: 'Raleway SemiBold'
  },
  formError: {
    color: 'red',
  },
  buttons: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20
  },
  button: {
    fontSize: 15,
    backgroundColor: 'black',
    borderRadius: '5px 0 5px 0',
    color: '#bdf7fb',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -2,
    marginLeft: -12,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    color: '#303031',
    fontSize: 12,
    cursor: 'pointer',
    '&:hover': {
      color: '#8bb4c2',
    },
    fontFamily: 'Raleway SemiBold'
  }
})

const validateEmail = (email) => {
  const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  return password.length >= 6;
}

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      regEmail: '',
      regFirstName: '',
      regLastName: '',
      regPassword: '',
      regConfirmPassword: '',
      emailError: false,
      passwordError: false,
      regEmailError: false,
      regFirstNameError: false,
      regLastNameError: false,
      regPasswordError: false,
      regPasswordMatch: false,
      remember: false
    };

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.isAuthenticated) {
      setTimeout(() => {
        if (nextProps.userAppointment && nextProps.user.isConfirm) {
          return this.props.push('/detail')
        }

        if (nextProps.user.isConfirm && !nextProps.userAppointment) {
          return this.props.push('/')
        }

        if(!nextProps.user.isConfirm) {
          return this.props.push('/confirm-register')
        }

      }, 1000);
    }
    // if ((this.props.isAuthenticated || nextProps.isAuthenticated) && !this.props.user.isAdmin) {
    //   this.props.push('/profile');
    // } else if((this.props.isAuthenticated || nextProps.isAuthenticated) && this.props.user.isAdmin) {
    //   this.props.push('/admin');
    // }
  }

  componentDidMount() {
    console.log('user', this.props.user)
    console.log('userAppointment', this.props.userAppointment)
    if(this.props.isAuthenticated && !this.props.user.isAdmin) {
      if (this.props.userAppointment) {
        this.props.push('/detail');
      }
    } else if (this.props.isAuthenticated && this.props.user.isAdmin) {
      this.props.push('/admin');
    }

    if (localStorage.getItem('remember')) {
      this.setState({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password')
      }, () => {
        this.handleLoginSubmit()
      });
    }
  }

  handleChange = name => event => {
    const validate = {};

    switch (name) {
      case 'email':
        validate.emailError = !validateEmail(this.state.email)
        break;
      case 'password':
        validate.passwordError = !validatePassword(this.state.password)
        break;
      case 'regFirstName':
        validate.regFirstNameError = !(this.state.regFirstName !== '')
        break;
      case 'regLastName':
        validate.regLastNameError = !(this.state.regLastName !== '')
        break;
      case 'regEmail':
        validate.regEmailError = !validateEmail(this.state.regEmail)
        break;
      case 'regPassword':
        validate.regPasswordError = !validatePassword(this.state.regPassword)
        break;
      case 'regConfirmPassword':
        validate.regPasswordMatch = !(this.state.regPassword === event.target.value)
        break;
      default:
        break;
    }

    this.setState({
      ...validate,
      [name]: event.target.value,
    })
  }

  handleLoginSubmit() {
    const { email, password, emailError, passwordError, remember } = this.state

    if (email !== '' && password !== '' && !emailError && !passwordError) {
      // this.props.push('/profile');
      if (remember) {
        localStorage.setItem('remember', this.state.remember)
        localStorage.setItem('email', this.state.email)
        localStorage.setItem('password', this.state.password)
      } else {
        localStorage.removeItem('remeber');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      this.props.loginAttempt({ email: email, password })
    }
  }

  handleRegisterSubmit() {
    const { regFirstName, regLastName, regEmail, regPassword, regConfirmPassword, regFirstNameError, regLastNameError, regEmailError, regPasswordError, regPasswordMatch } = this.state

    if (regFirstName !== '' && regLastName !== '' && regEmail !== '' && regPassword !== '' && regConfirmPassword !== '' && !regEmailError && !regPasswordError && !regPasswordMatch && !regFirstNameError && !regLastNameError) {
      this.props.registerAttempt({ email: regEmail, password: regPassword, firstName: regFirstName, lastName: regLastName });

    }
  }

  setRemember = () => {
    this.setState({ remember: !this.state.remember });
  }

  render() {

    const { classes, uiLoadingIn, uiLoadingNew, token } = this.props

    const { emailError, passwordError, regEmailError, regPasswordError, regPasswordMatch, regFirstNameError, regLastNameError } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <div className={classes.container}>
            <div className={classes.title}>access your account</div>
            <div className={classes.link}>fill in your information below</div>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <Grid container className={classes.grid} justify="center">
                <Grid item xs={12} md={6} className={classes.gridx}>
                  <div className={classes.formTitle}>Login</div>

                  <FormControl className={classes.formControl} aria-describedby="email-helper-text">
                    <InputLabel htmlFor="email-helper" className={classes.formLabel}>Email</InputLabel>
                    <Input id="email-helper" className={classes.formInput} value={this.state.email} type="email" onChange={this.handleChange('email')} />
                    {emailError &&
                      <FormHelperText id="email-error-text" className={classes.formError}>Invalid Email!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="password-helper-text">
                    <InputLabel htmlFor="password-helper" className={classes.formLabel}>Password</InputLabel>
                    <Input id="password-helper" className={classes.formInput} value={this.state.password} type="password" onChange={this.handleChange('password')} />
                    {passwordError &&
                      <FormHelperText id="password-error-text" className={classes.formError}>Invalid Password!</FormHelperText>
                    }
                  </FormControl>

                  <div className={classes.actions}>
                    <div className={classes.action}>
                      <Checkbox color="primary" value={this.state.remember} onChange={this.setRemember}/>
                      Remomber Me
                    </div>
                    <Link to="/forgot" className={classes.action}>Forgot Password?</Link>
                  </div>

                  <div className={classes.buttons}>
                    <Button className={classes.button} onClick={() => this.handleLoginSubmit()} disabled={uiLoadingIn}>
                      {!uiLoadingIn && 'LOGIN'}
                    </Button>
                    {uiLoadingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>

                </Grid>
                <Grid item xs={12} md={6} className={classes.gridx}>
                  <div className={classes.formTitle}>Register</div>

                  <FormControl className={classes.formControl} aria-describedby="reg-first-name-helper-text">
                    <InputLabel htmlFor="reg-first-name-helper" className={classes.formLabel}>First Name</InputLabel>
                    <Input id="reg-first-name-helper" className={classes.formInput} value={this.state.regFirstName} type="text" onChange={this.handleChange('regFirstName')} />
                    {regFirstNameError &&
                      <FormHelperText id="reg-first-name-error-text" className={classes.formError}>Required!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-last-name-helper-text">
                    <InputLabel htmlFor="reg-last-name-helper" className={classes.formLabel}>Last Name</InputLabel>
                    <Input id="reg-last-name-helper" className={classes.formInput} value={this.state.regLastName} type="text" onChange={this.handleChange('regLastName')} />
                    {regLastNameError &&
                      <FormHelperText id="reg-last-name-error-text" className={classes.formError}>Required!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-email-helper-text">
                    <InputLabel htmlFor="reg-email-helper" className={classes.formLabel}>Email</InputLabel>
                    <Input id="reg-email-helper" className={classes.formInput} value={this.state.regEmail} type="email" onChange={this.handleChange('regEmail')} />
                    {regEmailError &&
                      <FormHelperText id="reg-email-error-text" className={classes.formError}>Invalid Email!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-password-helper-text">
                    <InputLabel htmlFor="reg-password-helper" className={classes.formLabel}>Password</InputLabel>
                    <Input id="reg-password-helper" className={classes.formInput} value={this.state.regPassword} type="password" onChange={this.handleChange('regPassword')} />
                    {regPasswordError &&
                      <FormHelperText id="reg-password-error-text" className={classes.formError}>Invalid Password!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-confirm-password-helper-text">
                    <InputLabel htmlFor="reg-confirm-password-helper" className={classes.formLabel}>Confirm Password</InputLabel>
                    <Input id="reg-confirm-password-helper" className={classes.formInput} value={this.state.regConfirmPassword} type="password" onChange={this.handleChange('regConfirmPassword')} />
                    {regPasswordMatch &&
                      <FormHelperText id="reg-confirm-password-error-text" className={classes.formError}>Password does not match the confirm password.</FormHelperText>
                    }
                  </FormControl>

                  <div className={classes.buttons}>
                    <Button className={classes.button} onClick={() => this.handleRegisterSubmit()} disabled={uiLoadingNew}>
                      {!uiLoadingNew && 'REGISTER'}
                    </Button>
                    {uiLoadingNew && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </Grid>
              </Grid>
            </Slide>
          </div>
        </div>
      </div>
    )
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  loginAttempt,
  registerAttempt,
} = Actions;

const mapStateToProps = ({
  auth: { uiLoadingIn, uiLoadingNew, token, user, userAppointment },
}) => ({
  isAuthenticated: and(!!token, !!user),
  uiLoadingIn,
  uiLoadingNew,
  token,
  user,
  userAppointment
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  loginAttempt,
  registerAttempt
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Account)
