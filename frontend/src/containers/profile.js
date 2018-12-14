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
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

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
    fontWeight: 300,
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
    fontWeight: 300,
    color: '#717171',
    textAlign: 'center',
  },
  formControl: {
    margin: '10px 0',
    width: '100%',
  },
  formLabel: {
    color: '#717171 !important',
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
    justifyContent: 'space-around',
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
    color: '#717171',
    fontSize: 12,
    cursor: 'pointer',
    '&:hover': {
      color: '#8bb4c2',
    }
  },
  img: {
    width: '90%',
    maxWidth: 250,
    height: 250,
    margin: '0 auto'
  },
  altCommentHidden: {
    display: 'none'
  },
  altComment: {
    width: 245,
    height: 250,
    position: 'absolute',
    top: 0,
    left: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    border: '1px solid #dddddd',
    borderRadius: 5,
    zIndex: 1
  },
  file: {
    background: 'red',
    position: 'absolute',
    left: 50,
    height: 250,
    width: 250,
    opacity: 0,
    zIndex: 99
  },
  back: {
    backgroundColor: 'transparent',
    color: '#8bb4c2'
  },
})

const validateEmail = (email) => {
  const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  return password.length >= 6;
}

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      creditCard: '',
      password: '',
      confirmPassword: '',
      emailError: false,
      firstNameError: false,
      lastNameError: false,
      passwordError: false,
      passwordMatch: false,
    };
    this.handleselectedFile = this.handleselectedFile.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    console.log(user);
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      pictureUrl: user.pictureUrl
    });
  }

  handleChange = name => event => {
    const validate = {};

    switch (name) {
      case 'firstName':
        validate.firstNameError = !(this.state.firstName !== '')
        break;
      case 'lastName':
        validate.lastNameError = !(this.state.lastName !== '')
        break;
      case 'phone':
        validate.phoneError = !(this.state.phone !== '')
        break;
      case 'email':
        validate.emailError = !validateEmail(this.state.email)
        break;
      case 'password':
        validate.passwordError = !validatePassword(this.state.password)
        break;
      case 'confirmPassword':
        validate.passwordMatch = !(this.state.password === event.target.value)
        break;
      default:
        break;
    }

    this.setState({
      ...validate,
      [name]: event.target.value,
    })
  }

  handleUpdateSubmit() {
    const { firstName, lastName, email, password, phone, creditCard, confirmPassword, firstNameError, lastNameError, emailError, passwordError, passwordMatch } = this.state

    if (firstName !== '' && lastName !== '' && email !== '' && !emailError && !passwordError && !passwordMatch && !firstNameError && !lastNameError) {
      const data = new FormData();
      data.append('email', email);
      data.append('firstName', firstName);
      data.append('lastName', lastName);
      data.append('phone', phone);
      data.append('creditCard', creditCard);

      if ( this.state.selectedFile) {
        data.append('photo', this.state.selectedFile, this.state.selectedFile.name);
      }

      if (password) {
        data.append('password', password);
      }
      this.props.updateUserProfileRequest(data, this.props.user._id);
    }
  }

  handleselectedFile = event => {
    const selectedFile = event.target.files[0];

    this.setState({ selectedFile })
    var reader = new FileReader();
    var url = reader.readAsDataURL(selectedFile);

    reader.onloadend = function (e) {
      this.setState({
        pictureUrl: [reader.result]
      })
    }.bind(this);
  }

  render() {

    const { classes, uiLoadingNew, user } = this.props;
    const { emailError, passwordError, passwordMatch, firstNameError, lastNameError, phoneError } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <div className={classes.container}>
            <div className={classes.title}>
              <IconButton
                onClick={() => this.props.push('/detail')}
                className={classes.back}
                >
                <ChevronLeftIcon />
              </IconButton>you</div>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <Grid container className={classes.grid} justify="center">
                <Grid item xs={12} md={6} className={classes.gridx}>
                  <FormControl className={classes.formControl} aria-describedby="reg-first-name-helper-text">
                    <img className={classes.img} src={this.state.pictureUrl} alt='' />
                    <input type="file" onChange={this.handleselectedFile} className={classes.file}/>
                    <p className={this.state.pictureUrl ? classes.altCommentHidden : classes.altComment} >Please upload file</p>
                  </FormControl>
                  <FormControl className={classes.formControl} aria-describedby="reg-first-name-helper-text">
                    <InputLabel htmlFor="reg-first-name-helper" className={classes.formLabel}>First Name</InputLabel>
                    <Input id="reg-first-name-helper" className={classes.formInput} value={this.state.firstName} type="text" onChange={this.handleChange('firstName')} />
                    {firstNameError &&
                      <FormHelperText id="reg-first-name-error-text" className={classes.formError}>Required!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-last-name-helper-text">
                    <InputLabel htmlFor="reg-last-name-helper" className={classes.formLabel}>Last Name</InputLabel>
                    <Input id="reg-last-name-helper" className={classes.formInput} value={this.state.lastName} type="text" onChange={this.handleChange('lastName')} />
                    {lastNameError &&
                      <FormHelperText id="reg-last-name-error-text" className={classes.formError}>Required!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-phone-helper-text">
                    <InputLabel htmlFor="reg-phone-helper" className={classes.formLabel}>Phone #</InputLabel>
                    <Input id="reg-phone-helper" className={classes.formInput} value={this.state.phone} type="text" onChange={this.handleChange('phone')} />
                    {phoneError &&
                      <FormHelperText id="reg-phone-error-text" className={classes.formError}>Required!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-email-helper-text">
                    <InputLabel htmlFor="reg-email-helper" className={classes.formLabel}>Email</InputLabel>
                    <Input id="reg-email-helper" className={classes.formInput} value={this.state.email} type="email" onChange={this.handleChange('email')} />
                    {emailError &&
                      <FormHelperText id="reg-email-error-text" className={classes.formError}>Invalid Email!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-credit-card-helper-text">
                    <InputLabel htmlFor="reg-credit-card-helper" className={classes.formLabel}>Credit Card</InputLabel>
                    <Input id="reg-credit-card-helper" className={classes.formInput} value={this.state.creditCard} type="text" onChange={this.handleChange('creditCard')} />
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-password-helper-text">
                    <InputLabel htmlFor="reg-password-helper" className={classes.formLabel}>Password</InputLabel>
                    <Input id="reg-password-helper" className={classes.formInput} value={this.state.password} type="password" onChange={this.handleChange('password')} />
                    {passwordError &&
                      <FormHelperText id="reg-password-error-text" className={classes.formError}>Invalid Password!</FormHelperText>
                    }
                  </FormControl>

                  <FormControl className={classes.formControl} aria-describedby="reg-confirm-password-helper-text">
                    <InputLabel htmlFor="reg-confirm-password-helper" className={classes.formLabel}>Confirm Password</InputLabel>
                    <Input id="reg-confirm-password-helper" className={classes.formInput} value={this.state.confirmPassword} type="password" onChange={this.handleChange('confirmPassword')} />
                    {passwordMatch &&
                      <FormHelperText id="reg-confirm-password-error-text" className={classes.formError}>Password does not match the confirm password.</FormHelperText>
                    }
                  </FormControl>

                  <div className={classes.buttons}>
                    <Button className={classes.button} onClick={() => this.handleUpdateSubmit()} disabled={uiLoadingNew}>
                      {!uiLoadingNew && 'UPDATE'}
                    </Button>
                    {uiLoadingNew && <CircularProgress size={24} className={classes.buttonProgress} />}
                    <Button color="primary"  onClick={() => this.props.push('/detail')}>
                      Cancel
                    </Button>
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  updateUserProfileRequest,
} = Actions;

// function mapStateToProps(state) {
//   return {
//     user: state.user.userInfo,

//   };
// }

const mapStateToProps = ({
  auth: { user, uiLoadingNew },
}) => ({
  uiLoadingNew,
  user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  updateUserProfileRequest,
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Profile)
