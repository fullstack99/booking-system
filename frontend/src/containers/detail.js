import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'
import moment from 'moment';
// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import green from '@material-ui/core/colors/green';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Creators as Actions } from '../actions'
// Components
import Avatar from '../assets/photo.png'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'

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
    width: 600,
    position: 'relative',
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '30px 0',
    textAlign: 'center',
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
  date: {
    lineHeight: 2,
    fontSize: 25,
    color: '#2f2f2f',
    marginTop: 40,
    fontFamily: 'Raleway SemiBold'
  },
  contents: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 'calc(100vh - 366px)',
    backgroundColor: '#cfe1e3',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: '50%'
  },
  userName: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 20,
    fontWeight: 300,
    lineHeight: 2,
    fontFamily: 'Raleway ExtraLight'
  },
  grid: {
    marginTop: 50
  },
  tab: {
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center',
    cursor: 'pointer',
    fontFamily: 'Raleway Regular'
  },
  mytab: {
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center',
    cursor: 'pointer',
    fontFamily: 'Raleway Regular',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  cont: {
    padding: 20,
    display: 'block'
  },
  img: {
    width: '100%',
    cursor: 'pointer'
  },
  checkbox: {
    color: '#343434'
  },
  action: {
    display: 'flex'
  },
  popover: {
    padding: 30,
    color: '#343434'
  },
  label: {
    display: 'block',
    marginBottom: 30,
    // display: 'flex',
    // justifyContent: 'space-between'
  },
  span1: {
    marginLeft: 16
  },
  span2: {
    marginLeft: 30
  }

})

class Detail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      booking: null,
      checkedCancel: false
    }
  }

  componentWillMount() {
    const booking = JSON.parse(localStorage.getItem('booking'));
    this.setState({ booking });
    const { user } = this.props;
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    const booking = JSON.parse(localStorage.getItem('booking'));
    this.setState({ booking });

    // const cancelAppointment = nextProps.cancelAppointment;
    // if (cancelAppointment) {
    //   localStorage.removeItem('booking');
    //   this.setState({ booking: null });
    //   this.props.push('/');
    // }
  }

  navigate = to => {
    this.props.push(to)
  }

  seletOption = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  reschedule = () => {
    this.setState({
      anchorEl: null,
      checkedReschedule: !this.state.checkedReschedule,
      checkedCancel: false
    });
    this.props.setReschedule();
    this.props.push('/');
  }

  cancel = () => {
    const id = this.state.booking._id;
    this.props.cancelAppointmentRequest(id);
    setTimeout(() => {
      localStorage.removeItem('booking');
      this.setState({
        anchorEl: null,
        checkedCancel: !this.state.checkedCancel,
        checkedReschedule: false,
        booking: null
      });
    }, 300);

  }

  goHello = () => {
    const { token, reschedule, userAppointment, user } = this.props;
    console.log('reschedule', reschedule)
    console.log('userAppointment', userAppointment)
    if (!reschedule && userAppointment) {
      this.props.push('/good-news');
    } else if (!reschedule && !userAppointment) {
      this.props.push('/');
    }
  }

  render() {

    const { classes, user } = this.props;
    const { anchorEl, booking } = this.state;
    const open = Boolean(anchorEl);

    console.log('booking', booking)
    return (
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <div className={classes.container}>
            <div className={classes.title}>your next visit</div>
            <div className={classes.date} onClick={this.seletOption}>{ booking && moment(new Date(booking.bookingDate + '/' + (new Date()).getFullYear())).format('MMMM DD, YYYY')}</div>
            {
              booking && <Popover
                id="simple-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}

              >
                <div className={classes.popover}>
                  <label className={classes.label}>PLACE: <span className={classes.span1}>{booking.location}</span></label>
                  <label className={classes.label}>TIME: <span className={classes.span2}>{
                    parseInt(booking.bookingTime) > 12 ?
                      parseInt(booking.bookingTime.substr(0, booking.bookingTime.length - 1)) - 12 + ' : ' + booking.bookingTime.substr(booking.bookingTime.length - 3) + ' pm'
                    : booking.bookingTime + ' am'

                  }</span></label>
                  <div className={classes.action}>
                    <div>
                      <label>CANCEL</label>
                      <Checkbox
                        checked={this.state.checkedCancel}
                        onChange={this.cancel}
                        value="checkedCancel"
                        color="primary"
                        className={classes.checkbox}
                      />
                    </div>
                    <div>
                      <label>RESCHEDULE</label>
                      <Checkbox
                        checked={this.state.checkedReschedule}
                        onChange={this.reschedule}
                        value="checkedReschedule"
                        color="primary"
                        className={classes.checkbox}
                      />
                    </div>
                  </div>
                </div>
              </Popover>
            }
          </div>
        </div>
        <div className={classes.contents}>
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <div className={classes.container}>

              <div className={classes.userInfo} onClick={() => this.navigate('/profile')}>
                <img src={this.props.user.pictureUrl ? this.props.user.pictureUrl : Avatar} className={classes.avatar} alt='' />
                {/* <div className={classes.userName}>{user.firstName} {user.lastName}</div> */}
                <div className={classes.userName}>{user.email}</div>
              </div>

              <Grid container className={classes.grid} justify="center">
                <Grid item xs={4}>
                  <div className={classes.tab} onClick={() => this.navigate('/glasses')}>MY GLASSES</div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.mytab} onClick={() => this.navigate('/prescription')}>MY PRESCRIPTION</div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.tab} onClick={() => this.navigate('/vision')}>MY VISION</div>
                </Grid>
              </Grid>

              <Grid container className={classes.grid} justify="center">
                <Grid item xs={12} md={4}>
                  <a href="http://visionarystream.com/glasses" target="_blank" className={classes.cont}>
                    <img className={classes.img} src={img1} alt='' />
                  </a>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={classes.cont}>
                    <img className={classes.img} src={img2} alt='' onClick={this.goHello} />
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <a href="http://visionarystream.com/" target="_blank" className={classes.cont}>
                    <img className={classes.img} src={img3} alt='' />
                  </a>
                </Grid>
              </Grid>

            </div>
          </Slide>
        </div>
      </div>
    )
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired,
}
const {
  cancelAppointmentRequest,
  setReschedule
} = Actions;

const mapStateToProps = ({
  auth: { token, user, userAppointment },
  user: { cancelAppointment, reschedule }
}) => ({
  user,
  cancelAppointment,
  userAppointment,
  reschedule
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  cancelAppointmentRequest,
  setReschedule
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(Detail)
