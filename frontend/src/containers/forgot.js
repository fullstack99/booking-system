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

  contents: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 'calc(100vh - 370px)',
  },
  grid: {
    margin: '100px 0',
    [theme.breakpoints.down('md')]: {
      margin: '50px 0',
    },
  },
  formTitle: {
    width: '100%',
    fontSize: 30,
    fontWeight: 300,
    color: '#717171',
    textAlign: 'center',
  },
  formControl: {
    margin: '10px 0',
    width: '100%',
    maxWidth: 320
  },
  formLabel: {
    color: '#717171 !important',
  },
  formInput: {
    color: '#717171',
    "&:before": {
      borderColor: '#717171'
    },
    "&:after": {
      borderColor: '#717171'
    }
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
})

const validateEmail = (email) => {
  const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

class Forgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

  }

  handleChange = name => event => {
    const validate = {};

    switch (name) {
      case 'email':
        validate.emailError = !validateEmail(this.state.email)
        break;

      default:
        break;
    }

    this.setState({
      ...validate,
      [name]: event.target.value,
    })
  }

  handleForgotSubmit() {
    const { email, emailError } = this.state

    if (email !== '' && !emailError) {
      this.props.forgotAttempt(email)
    }
  }

  render() {

    const { classes, uiLoadingIn, uiLoadingNew, token } = this.props
    const { emailError } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <Grid container className={classes.grid} justify="center">

                  <div className={classes.formTitle}>Reset your password</div>

                  <FormControl className={classes.formControl} aria-describedby="email-helper-text">
                    <InputLabel htmlFor="email-helper" className={classes.formLabel}>Email</InputLabel>
                    <Input id="email-helper" className={classes.formInput} value={this.state.email} type="email" onChange={this.handleChange('email')} />
                    {emailError &&
                      <FormHelperText id="email-error-text" className={classes.formError}>Invalid Email!</FormHelperText>
                    }
                  </FormControl>

                  <div className={classes.buttons}>
                    <Button className={classes.button} onClick={() => this.handleForgotSubmit()} disabled={uiLoadingIn}>
                      {!uiLoadingIn && 'SEND'}
                    </Button>
                    {uiLoadingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>



              </Grid>
            </Slide>
          </div>
        </div>
      </div>
    )
  }
}

Forgot.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  forgotAttempt,
} = Actions;

const mapStateToProps = ({
  auth: { uiLoadingIn, uiLoadingNew, token, user },
}) => ({
  isAuthenticated: and(!!token, !!user),
  uiLoadingIn,
  uiLoadingNew,
  token,
  user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  forgotAttempt
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Forgot)
