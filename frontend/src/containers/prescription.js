import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'
import { Link, withRouter } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// Material UI
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfe1e3',
    minHeight: 350,
    [theme.breakpoints.down('xs')]: {
      minHeight: 200,
    },
  },
  between: {
    padding: '0 5px',
    color: '#303031'
  },
  filterBar: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px 0',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  option: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      padding: '5px 0',
      width: '100%',
    },
  },
  justifyLeft: {
    justifyContent: 'flex-start',
  },
  justifyRight: {
    justifyContent: 'flex-end',
  },
  label: {
    height: 35,
    lineHeight: '35px',
    paddingRight: 5
  },
  input: {
    height: 35,
    border: '1px solid #757575',
    flex: 6,
    display: 'flex',
    alignItems: 'center',
    'justify-content': 'center',
    minWidth: 100
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
    backgroundColor: '#e8f1f2',
    [theme.breakpoints.down('xs')]: {
      padding: 5
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  td: {
    border: '1px solid #757575',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '15px 0',
    fontSize: 15,
    [theme.breakpoints.down('xs')]: {
      padding: '10px 0',
      fontSize: 10
    },
  },
  button: {
    fontSize: 15,
    backgroundColor: 'black',
    borderRadius: '5px 0 5px 0',
    color: '#bdf7fb',
    '&:hover': {
      backgroundColor: 'black',
    },
    marginTop: 20
  },
  messageButton: {
    fontSize: 15,
    backgroundColor: 'black',
    borderRadius: '5px 0 5px 0',
    color: '#bdf7fb',
    '&:hover': {
      backgroundColor: 'black',
    },
    marginTop: 20,
    width: 200
  },
  back: {
    backgroundColor: 'transparent',
    color: '#8bb4c2',
    marginLeft: -45
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
  formControl: {
    margin: '10px 0',
    width: '100%',
  },
  bottom: {
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: 'red'
  },
  tabs: {
    marginTop: 80,
    marginBottom: 15
  },
  tab: {
    color: '#303031',
    cursor: 'pointer'
  }
})

const validateEmail = (email) => {
  const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_PATTERN.test(String(email).toLowerCase());
}

class Prescription extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      email: '',
      content: '',
      emailError: false,
      contentError: false
    }
  }

  printPDF = () => {
    const table = document.getElementById('printTable');
    html2canvas(table)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 30, 20);
        pdf.save("download.pdf");
      })
    ;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  gotoBack = () => {
    this.props.push('/detail')
  }

  handleChangeVal = name => event => {
    const validate = {};

    switch (name) {
      case 'email':
        validate.emailError = !validateEmail(this.state.email)
        break;
      case 'content':
        validate.contentError = !this.state.content
        break;
      default:
        break;
    }

    this.setState({
      ...validate,
      [name]: event.target.value
    });
  };

  handleMessageSubmit() {
    console.log('submit')
    const { email, content } = this.state;
    this.props.sendEmailRequest({
      email: email,
      content: content
    })
  }

  render() {

    const { classes, user } = this.props
    const { value, emailError, contentError } = this.state
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
              </IconButton>your prescription</div>
            <div className={classes.link}>focused on details</div>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <React.Fragment>
                <div className={classes.tabs}>
                  <span className={classes.tab} onClick={() => this.setState({ value: 0 })}>glasses</span>
                  <span className={classes.between}>|</span>
                  <span className={classes.tab} onClick={() => this.setState({ value: 0 })}>contacts</span>
                </div>
                { value === 0 &&
                  <React.Fragment>
                    <div className={classes.grid}>
                      <div className={classes.tables} id="printTable">
                        <div className={classes.tableIn}>
                          <table className={classes.table}>
                            <tbody>
                              <tr>
                                <td className={classes.td}></td>
                                <td className={classes.td}>SPHERE</td>
                                <td className={classes.td}>CYLINDER</td>
                                <td className={classes.td}>AXIS</td>
                                <td className={classes.td}>BASE</td>
                                <td className={classes.td}>ADD</td>
                                <td className={classes.td}>DIA</td>
                              </tr>
                              <tr>
                                <td className={classes.td}>RIGHT (OD)</td>
                                <td className={classes.td}>{user.rightSphere}</td>
                                <td className={classes.td}>{user.rightCylinder}</td>
                                <td className={classes.td}>{user.rightAxis}</td>
                                <td className={classes.td}>{user.rightBase}</td>
                                <td className={classes.td}>{user.rightAdd}</td>
                                <td className={classes.td}>{user.rightDia}</td>
                              </tr>
                              <tr>
                                <td className={classes.td}>LEFT (OS)</td>
                                <td className={classes.td}>{user.leftSphere}</td>
                                <td className={classes.td}>{user.leftCylinder}</td>
                                <td className={classes.td}>{user.leftAxis}</td>
                                <td className={classes.td}>{user.leftBase}</td>
                                <td className={classes.td}>{user.leftAdd}</td>
                                <td className={classes.td}>{user.leftDia}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <Button className={classes.button} onClick={this.printPDF}>PRINT</Button>
                      </div>
                    </div>
                    <div className={classes.filterBar}>
                      <div className={classNames(classes.option, classes.justifyLeft)}>
                        <label htmlFor="doctor" className={classes.label}>doctor</label>
                        <div className={classes.input}>{user.doctorName}</div>
                      </div>
                      <div className={classNames(classes.option, classes.justifyRight)}>
                        <label htmlFor="license" className={classes.label}>license #</label>
                        <div className={classes.input}>{user.license}</div>
                      </div>
                    </div>
                  </React.Fragment>
                }
                {value === 1 && <React.Fragment>
                  <form noValidate autoComplete="off">
                    <FormControl className={classes.formControl} aria-describedby="email-helper-text">
                      <InputLabel htmlFor="email-helper" className={classes.formLabel}>Email</InputLabel>
                      <Input id="email-helper" className={classes.formInput} value={this.state.email} type="email" onChange={this.handleChangeVal('email')} />
                      {emailError &&
                        <FormHelperText id="email-error-text" className={classes.formError}>Invalid Email!</FormHelperText>
                      }
                    </FormControl>
                    <FormControl className={classes.formControl} aria-describedby="content-helper-text">
                      <InputLabel htmlFor="content-helper" className={classes.formLabel}>Content</InputLabel>
                      <Input id="content-helper" className={classes.formInput} value={this.state.content} type="text" onChange={this.handleChangeVal('content')} />
                      {contentError &&
                        <FormHelperText id="content-error-text" className={classes.formError}>Required!</FormHelperText>
                      }
                    </FormControl>
                    <div className={classes.bottom}>
                      <Button className={classes.messageButton} onClick={() => this.handleMessageSubmit()}>Send</Button>
                    </div>
                  </form>
                  </React.Fragment>
                }

              </React.Fragment>
            </Slide>
          </div>
        </div>
      </div>
    )
  }
}

Prescription.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({
  auth: { user },
}) => ({
  user
})

const {
  sendEmailRequest,
} = Actions;


const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  sendEmailRequest
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Prescription)
