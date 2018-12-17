import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import { bindActionCreators, compose } from 'redux';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import IconError from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import IconClose from '@material-ui/icons/Close'

import { Creators as Actions } from '../../actions';
import glass from '../../assets/glass.png'
import { NONE } from 'apisauce';

const styles = theme => ({
  paper: {
    padding: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15
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
  grid: {
    backgroundColor: '#ffffff',
  },
  gridx: {
    padding: '25px',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
    },
  },
  gridImage: {
    padding: '25px',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
    },
    position: 'relative'
  },
  img: {
    width: '90%',
    maxWidth: 250,
    height: 250
  },
  tables: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  tableIn: {
    padding: 20,
    width: '100%',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('xs')]: {
      padding: 5
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  td: {
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: 5,
    fontSize: 15,
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0',
      fontSize: 10
    },
  },
  in: {
    padding: '50px 30px'
  },
  h1: {
    width: '100%',
    fontSize: 30
  },
  p1: {
    paddingTop: 30,
    width: '100%',
    fontSize: 15,
    lineHeight: 1.5
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  file: {
    background: 'red',
    position: 'absolute',
    left: 30,
    height: 250,
    opacity: 0,
    zIndex: 99
  },
  altCommentHidden: {
    display: 'none'
  },
  altComment: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    border: '1px solid #dddddd',
    borderRadius: 5,
    zIndex: 1
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
});

class UserDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      doctorNameError: false,
      lens: '',
      frames: '',
      warranty: '',
      rightSphere: '',
      rightCylinder: '',
      rightAxis: '',
      rightBase: '',
      rightAdd: '',
      rightDia: '',
      leftSphere: '',
      leftCylinder: '',
      leftAxis: '',
      leftBase: '',
      leftAdd: '',
      leftDia: '',
      visionTitle: '',
      visionContent: '',
      doctorName: '',
      selectedFile: null,
      notify: false,
      open: false,
      firstName: '',
      lastName: '',
      email: ''

    }
    this.handleselectedFile = this.handleselectedFile.bind(this);
  }

  componentWillMount() {
    const userId = this.props.match.params.userId;
    this.setState({userId: userId})
    this.props.getUserDetailInfoRequest(userId)
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (nextProps.user.isFetched) {
      this.setState({...nextProps.user.userInfo}, () => {
        delete this.state.password;
        delete this.state.created_at;
        delete this.state.updated_at;
        this.setState(this.state);
      })
      this.setState({ notify: true })
    }
  }

  handleChange = name => event => {
    const validate = {};

    switch (name) {
      case 'doctorName':
        validate.doctorNameError = !(event.target.value !== '')
        break;
      case 'license':
        validate.licenseError = !(event.target.value !== '')
        break;

      default:
        break;
    }

    this.setState({
      ...validate,
      [name]: event.target.value,
    })
  }

  gotoBack = () => {
    this.props.push('/admin/user')
  }

  handleSubmit = () => {
    if (!this.state.doctorNameError && this.state.doctorName && !this.state.licenseError && this.state.license) {
      const data = new FormData();

      const keys = Object.keys(this.state);
      keys.forEach(key => {
        if ( key == 'selectedFile' || key == 'glassUrl' || key == '_id' || key == '__v' || key == 'userId' || key == 'notify' || key == 'open') {
          return;
        } else {
          data.append(key, this.state[key]);
        }
      });
      if (this.state.selectedFile) {
        data.append('photo', this.state.selectedFile, this.state.selectedFile.name);
      }

      this.props.updateUserInfoRequest(data, this.state.userId);

    }

  }

  handleselectedFile = event => {
    const selectedFile = event.target.files[0];

    this.setState({ selectedFile })
    var reader = new FileReader();
    var url = reader.readAsDataURL(selectedFile);

    reader.onloadend = function (e) {
      this.setState({
        glassUrl: [reader.result]
      })
    }.bind(this);
  }

  closeNotification = () => {
    this.setState({
      notify: false,
    })
  }

  render() {
    const { classes, user, theme, clearNotification, notification } = this.props;
    const { doctorNameError, licenseError } = this.state;
    console.log('user detail', this.state);
    if (user.isFetched && user.userInfo) {
      return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <h3>Uer info</h3>
            <FormControl className={classes.formControl} aria-describedby="lens-helper-text">
              <InputLabel htmlFor="lens-helper" className={classes.formLabel}>First Name</InputLabel>
              <Input id="lens-helper" className={classes.formInput} value={this.state.firstName} defaultValue={this.state.firstName} type="text" onChange={this.handleChange('firstName')} />
            </FormControl>
            <FormControl className={classes.formControl} aria-describedby="lens-helper-text">
              <InputLabel htmlFor="lens-helper" className={classes.formLabel}>Last Name</InputLabel>
              <Input id="lens-helper" className={classes.formInput} value={this.state.lastName} defaultValue={this.state.lastName} type="text" onChange={this.handleChange('lastName')} />
            </FormControl>
            <FormControl className={classes.formControl} aria-describedby="lens-helper-text">
              <InputLabel htmlFor="lens-helper" className={classes.formLabel}>Email</InputLabel>
              <Input id="lens-helper" className={classes.formInput} value={this.state.email} defaultValue={this.state.email} type="text" onChange={this.handleChange('email')} />
            </FormControl>
            <Divider />
            <h3>Glasses</h3>
            <Grid container className={classes.grid} justify="center">
              <Grid item xs={12} md={6} className={classes.gridImage}>
                <img className={classes.img} src={this.state.glassUrl} alt='' />
                <input type="file" onChange={this.handleselectedFile} className={classes.file}/>
                <p className={this.state.glassUrl ? classes.altCommentHidden : classes.altComment} >Please upload file</p>
              </Grid>
              <Grid item xs={12} md={6} className={classes.gridx}>
                <FormControl className={classes.formControl} aria-describedby="lens-helper-text">
                  <InputLabel htmlFor="lens-helper" className={classes.formLabel}>LENS</InputLabel>
                  <Input id="lens-helper" className={classes.formInput} value={this.state.lens} defaultValue={this.state.lens} type="text" onChange={this.handleChange('lens')} />
                </FormControl>
                <FormControl className={classes.formControl} aria-describedby="frames-helper-text">
                  <InputLabel htmlFor="frames-helper" className={classes.formLabel}>FRAMES</InputLabel>
                  <Input id="frames-helper" className={classes.formInput} value={this.state.frames} type="text" onChange={this.handleChange('frames')} />
                </FormControl>
                <FormControl className={classes.formControl} aria-describedby="warranty-helper-text">
                  <InputLabel htmlFor="warranty-helper" className={classes.formLabel}>WARRANTY</InputLabel>
                  <Input id="warranty-helper" className={classes.formInput} value={this.state.warranty} type="text" onChange={this.handleChange('warranty')} />
                </FormControl>
              </Grid>
            </Grid>
            <Divider />
            <h3>Prescription</h3>
            <div className={classes.tableIn}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td className={classes.td}></td>
                    <td className={classes.td}>SPHERE</td>
                    <td className={classes.td}>CYLINDER</td>
                    <td className={classes.td}>AXIS</td>
                    <td className={classes.td}>BASE</td>
                    <td className={classes.td}>ADD.</td>
                    <td className={classes.td}>DIA</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>RIGHT O.D.</td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="rightSphere-helper-text">
                        <InputLabel htmlFor="rightSphere-helper" className={classes.formLabel}></InputLabel>
                        <Input id="rightSphere-helper" className={classes.formInput} value={this.state.rightSphere} type="text" onChange={this.handleChange('rightSphere')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="rightCylinder-helper-text">
                        <InputLabel htmlFor="rightCylinder-helper" className={classes.formLabel}></InputLabel>
                        <Input id="rightCylinder-helper" className={classes.formInput} value={this.state.rightCylinder} type="text" onChange={this.handleChange('rightCylinder')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="rightAxis-helper-text">
                        <InputLabel htmlFor="rightAxis-helper" className={classes.formLabel}></InputLabel>
                        <Input id="rightAxis-helper" className={classes.formInput} value={this.state.rightAxis} type="text" onChange={this.handleChange('rightAxis')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="rightBase-helper-text">
                        <InputLabel htmlFor="rightBase-helper" className={classes.formLabel}></InputLabel>
                        <Input id="rightBase-helper" className={classes.formInput} value={this.state.rightBase} type="text" onChange={this.handleChange('rightBase')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="rightAdd-helper-text">
                        <InputLabel htmlFor="rightAdd-helper" className={classes.formLabel}></InputLabel>
                        <Input id="rightAdd-helper" className={classes.formInput} value={this.state.rightAdd} type="text" onChange={this.handleChange('rightAdd')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="rightDia-helper-text">
                        <InputLabel htmlFor="rightDia-helper" className={classes.formLabel}></InputLabel>
                        <Input id="rightDia-helper" className={classes.formInput} value={this.state.rightDia} type="text" onChange={this.handleChange('rightDia')} />
                      </FormControl>
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>LEFT O.S.</td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="leftSphere-helper-text">
                        <InputLabel htmlFor="leftSphere-helper" className={classes.formLabel}></InputLabel>
                        <Input id="leftSphere-helper" className={classes.formInput} value={this.state.leftSphere} type="text" onChange={this.handleChange('leftSphere')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="leftCylinder-helper-text">
                        <InputLabel htmlFor="leftCylinder-helper" className={classes.formLabel}></InputLabel>
                        <Input id="leftCylinder-helper" className={classes.formInput} value={this.state.leftCylinder} type="text" onChange={this.handleChange('leftCylinder')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="leftAxis-helper-text">
                        <InputLabel htmlFor="leftAxis-helper" className={classes.formLabel}></InputLabel>
                        <Input id="leftAxis-helper" className={classes.formInput} value={this.state.leftAxis} type="text" onChange={this.handleChange('leftAxis')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="leftBase-helper-text">
                        <InputLabel htmlFor="leftBase-helper" className={classes.formLabel}></InputLabel>
                        <Input id="leftBase-helper" className={classes.formInput} value={this.state.leftBase} type="text" onChange={this.handleChange('leftBase')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="leftAdd-helper-text">
                        <InputLabel htmlFor="leftAdd-helper" className={classes.formLabel}></InputLabel>
                        <Input id="leftAdd-helper" className={classes.formInput} value={this.state.leftAdd} type="text" onChange={this.handleChange('leftAdd')} />
                      </FormControl>
                    </td>
                    <td className={classes.td}>
                      <FormControl className={classes.formControl} aria-describedby="leftDia-helper-text">
                        <InputLabel htmlFor="leftDia-helper" className={classes.formLabel}></InputLabel>
                        <Input id="leftDia-helper" className={classes.formInput} value={this.state.leftDia} type="text" onChange={this.handleChange('leftDia')} />
                      </FormControl>
                    </td>
                  </tr>
                </tbody>

              </table>
            </div>
            <FormControl className={classes.formControl} aria-describedby="license-helper-text">
              <InputLabel htmlFor="license-helper" className={classes.formLabel}>License</InputLabel>
              <Input id="license-helper" className={classes.formInput} value={this.state.license} type="text" onChange={this.handleChange('license')} />
              {licenseError &&
                <FormHelperText id="license-error-text" className={classes.formError}>Please insert license</FormHelperText>
              }
            </FormControl>
            <FormControl className={classes.formControl} aria-describedby="doctorName-helper-text">
              <InputLabel htmlFor="doctorName-helper" className={classes.formLabel}>DOCTOR</InputLabel>
              <Input id="doctorName-helper" className={classes.formInput} value={this.state.doctorName} type="text" onChange={this.handleChange('doctorName')} />
              {doctorNameError &&
                <FormHelperText id="doctorName-error-text" className={classes.formError}>Please insert Doctor Name</FormHelperText>
              }
            </FormControl>
            <Divider />
            <h3>Vision</h3>
            <div className={classes.in}>
              <FormControl className={classes.formControl} aria-describedby="visionTitle-helper-text">
                <InputLabel htmlFor="visionTitle-helper" className={classes.formLabel}>TITLE</InputLabel>
                <Input id="visionTitle-helper" className={classes.formInput} value={this.state.visionTitle} type="text" onChange={this.handleChange('visionTitle')} />
              </FormControl>
              <FormControl className={classes.formControl} aria-describedby="visionContent-helper-text">
                <InputLabel htmlFor="visionContent-helper" className={classes.formLabel}>CONTENT</InputLabel>
                <Input id="visionContent-helper" className={classes.formInput} value={this.state.visionContent} type="text" onChange={this.handleChange('visionContent')} />
              </FormControl>

              <Divider />
            </div>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
              Save
            </Button>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.gotoBack}>
              Cancel
            </Button>
          </Paper>
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
                {notification.level && (notification.level === 'error') && (
                  <IconError
                    className={classes.iconError}
                    color="error"
                  />
                )}
                {notification.level && (notification.level === 'success') && (
                  <IconError
                    className={classes.iconError}
                    color="primary"
                  />
                )}
                {notification.message}
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
        </React.Fragment>
      )
    } else {
      return (
        <CircularProgress className={classes.progress} />
      )
    }

  }
}

UserDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

const { getUserDetailInfoRequest, updateUserInfoRequest, clearNotification } = Actions;

function mapStateToProps(state) {
  return {
    user: state.user,
    notification: state.notification
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  getUserDetailInfoRequest,
  updateUserInfoRequest,
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(UserDetail)