import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'
import  { Redirect } from 'react-router-dom'
// Material UI
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// Components

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
  },
  contents: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 'calc(100vh - 370px)',
  },
  grid: {
    margin: 0,
    minHeight: 350,
    [theme.breakpoints.down('md')]: {
      margin: '50px 0',
    },
  },
  in: {
    padding: '50px 30px'
  },
  h1: {
    width: '100%',
    fontSize: 30,
    fontFamily: 'Raleway ExtraLight'
  },
  p1: {
    paddingTop: 30,
    width: '100%',
    fontSize: 15,
    lineHeight: 3,
    fontFamily: 'Raleway ExtraLight',
    textAlign: 'center',
    color: '#757575',
  },
  back: {
    backgroundColor: 'transparent',
    color: '#8bb4c2'
  },
  confirmMail: {
    color: '#8bb4c2',
  }
})

class CheckConfirmRegister extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { user } = this.props;
    const token = this.props.match.params.token;
    console.log(user);
    this.props.confirmRegisterAttempt(token, user._id);
  }


  render() {

    const { classes, user } = this.props
    console.log(user)
    if (user.isConfirm) {
      return (
        <Redirect to='/detail'  />
      )
    } else {
      return null
    }

  }
}

CheckConfirmRegister.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  confirmRegisterAttempt,
} = Actions;

const mapStateToProps = ({
  auth: { user },
}) => ({
  user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  confirmRegisterAttempt
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(CheckConfirmRegister)
