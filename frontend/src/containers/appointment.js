import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'
// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import { Creators as Actions } from '../actions'

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
    position: 'relative',
    margin: '0 auto',
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
  },
  link: {
    lineHeight: 2,
    fontSize: 12,
    color: '#8bb4c2',
    marginTop: 40,
  },
  contents: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  grid: {
    margin: '100px 0',
    minHeight: 350,
    [theme.breakpoints.down('md')]: {
      margin: '50px 0',
    },
  },
  item: {
    padding: 10,
  },
  button: {
    fontSize: 15,
    backgroundColor: 'black',
    color: '#bdf7fb',
    '&:hover': {
      backgroundColor: 'black',
    },
    width: 130,
    margin: '0 auto'
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
})

class Appointment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appointment: '',
      appointmentError: false,
    }

  }

  handleChange = name => event => {
    const validate = {};
    switch (name) {
      case 'appointment':
        validate.appointmentError = !(this.state.appointment !== '')
        break;
      default:
        break;
    }
    this.setState({
      ...validate,
      [name]: event.target.value,
    })
  }

  onChange = date => this.setState({ date })

  handleRegisterSubmit() {
    if ( !this.state.appointmentError && this.state.appointment !== '') {
      this.props.setAppointment({
        appointment: this.state.appointment
      });
      this.props.push('/');
    } else {
      this.setState({ appointmentError: true });
    }

  }

  render() {

    const { classes } = this.props;
    const { appointmentError } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.title}>when would you like your exam?</div>
          <div className={classes.link}>just let us know</div>
        </div>
        <div className={classes.contents}>
          <Grid className={classes.item}>
            <FormControl className={classes.formControl} aria-describedby="appointment-helper-text">
              <InputLabel htmlFor="appointment-helper" className={classes.formLabel}>Appointment For</InputLabel>
              <Input id="appointment-helper" className={classes.formInput} value={this.state.appointment} type="text" onChange={this.handleChange('appointment')} />
              {appointmentError &&
                <FormHelperText id="appointment-error-text" className={classes.formError}>Please insert Name</FormHelperText>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button variant="contained" className={classes.button} onClick={() => this.handleRegisterSubmit()}>
                submit
              </Button>
            </FormControl>
          </Grid>
        </div>
      </div>
    )
  }
}

Appointment.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  setAppointment
} = Actions;

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  setAppointment
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Appointment)
