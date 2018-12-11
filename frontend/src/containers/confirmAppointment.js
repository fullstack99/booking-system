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

})

class ConfirmAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

  }

  componentWillMount() {
    const token = this.props.match.params.token;
    this.props.confirmAttempt(token);
  }

  render() {

    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <h3>The appointment has been successfully confirmed.</h3>
            </Slide>
          </div>
        </div>
      </div>
    )
  }
}

ConfirmAppointment.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  confirmAttempt,
} = Actions;

const mapStateToProps = ({
  auth: { user },
}) => ({
  user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  confirmAttempt
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(ConfirmAppointment)
