import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import Slider from 'react-slick';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment';

import { Creators as Actions } from '../actions';

// Material UI
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
  content: {
    width: '100%',
    maxWidth: 767,
    margin: '0 auto'
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
  month: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    fontFamily: 'Raleway SemiBold'
  },
  item: {
    textAlign: 'center',
    border: '1px solid #d4d9dd',
    borderLeft: 'none',
    cursor: 'pointer'
  },
  itemActivity: {
    textAlign: 'center',
    border: '1px solid #00a2e1',
    cursor: 'pointer'
  },
  date: {
    fontSize: 30,
    color: '#333333',
    fontFamily: 'Raleway SemiBold'
  },
  dateActivity: {
    fontSize: 30,
    color: '#00a2e1',
    fontFamily: 'Raleway SemiBold'
  },
  day: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Raleway Regular'
  },
  times: {

  },
  time: {
    textAlign: 'center',
    border: '1px solid #d4d9dd',
    fontSize: 20,
    color: '#757575 !important',
    width: 140,
    height: 50,
    margin: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid #00a2e1',
    },
    fontFamily: 'Raleway Regular'
  },
  timeActivity: {
    textAlign: 'center',
    border: '1px solid #00a2e1',
    fontSize: 20,
    color: '#00a2e1 !important',
    width: 100,
    height: 50,
    margin: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: 'Raleway SemiBold'
  },
  available: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#757575'
  },
  dialog: {
    paper: {
      background: 'red'
    }
  },
  h3: {
    color: '#333333',
    fontFamily: 'Raleway SemiBold'
  },
  dayItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class PickDate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weekday: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ],
      settings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 5,
              slidesToScroll: 5
            }
          },
          {
            breakpoint: 767,
            settings: {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 667,
            settings: {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 567,
            settings: {
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      },
      dates: [],
      thisMonth: new Date(),
      times: [],
      originalTimes: [],
      settedTime: null,
      settedDate: null,
    }

  }

  componentWillMount() {
    this.props.getBookingDatesRequest();
    const { weekday } = this.state;
    const today = new Date();
    let next = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    if (today.getMonth() == 11) {
      next = new Date(today.getFullYear() + 1, 0, 1);
    }

    let dates = [], times = [];
    dates.push(
      {
        date: moment(today).format('MMM DD'),
        day: 'Today'
      }
    )
    for (let i = 1; i < 31; i++) {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + i);
      const data = {
        date: moment(tomorrow).format('MMM DD'),
        day: weekday[tomorrow.getDay()]
      }
      dates.push(data)
    }
    for (let j = 9; j < 20; j++) {
      const current = j + ' : 00';
      const nextTime = j + ' : 30';
      times.push(current);
      times.push(nextTime);
    }
    this.setState({ dates })
    this.setState({ originalTimes: times });
    this.setState({ times: times });

    this.setState({ thisMonth: moment(today).format('MMM') })
    this.setState({ NextMonth: moment(next).format('MMM') })
  }

  setBookingTime = time => {
    this.setState({ settedTime: time }, () => {
      if (this.state.settedDate) {
        this.props.pickDate({
          date: this.state.settedDate,
          time: this.state.settedTime
        })
        // this.props.push('/appointment')
        // this.props.push('/detail');
      }
    })
  }

  setBookingDate = date => {

    const { user } = this.props;
    const { times, originalTimes } = this.state;
    const temp = originalTimes.slice();
    const timesBySettedDate = user.bookings[date];

    if (timesBySettedDate) {
      timesBySettedDate.map(time => {
        const index = times.indexOf(time);
        if (index > -1) {
          temp.splice(index, 1);
        }
      })
    }
    this.setState({ times: temp });

    this.setState({ settedDate: date })
  }

  render() {
    const { classes, user } = this.props;
    const { settings, dates, thisMonth, NextMonth, times, settedDate, settedTime } = this.state;

    if (user.isFetched) {
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.title}>When would you like your exam? <br/>just let know</div>
          </div>
          <div className={classes.content}>
            <p className={classes.month}>{thisMonth} / {NextMonth}</p>
            <Slider {...settings}>
              {
                dates.map((item, index) => {
                  return(
                    <div key={index} className={settedDate === item.date ? classes.itemActivity : classes.item} onClick={() => this.setBookingDate(item.date)} >
                      <p className={classes.day}>{item.day}</p>
                      <p className={settedDate === item.date ? classes.dateActivity : classes.date} >{item.date}</p>
                    </div>
                  )
                })
              }
            </Slider>
            <Grid className={classes.times} container={true}>
              <Grid item xs={12} md={4} className={classes.dayItem}>
                <h3 className={classes.h3}>Morning</h3>
                {
                  times.length > 0 ?
                    times.map((time, index) => {
                      if(parseInt(time) < 12 ) {
                        return (
                          <Button key={index} className={settedTime === time ? classes.timeActivity :classes.time} onClick={() =>this.setBookingTime(time)} disabled={!settedDate}>
                            {time} am
                          </Button>
                        )
                      } else {
                        return null
                      }

                    })
                  : <p> There is no availability</p>
                }
              </Grid>

              <Grid item xs={12} md={4} className={classes.dayItem}>
                <h3 className={classes.h3}>Afternoon</h3>
                {
                  times.length > 0 ?
                    times.map((time, index) => {
                      if(parseInt(time) >= 12 && parseInt(time) < 17 && parseInt(time) != 16 && parseInt(time) != 12) {
                        return (
                          <Button key={index} className={settedTime === time ? classes.timeActivity :classes.time} onClick={() =>this.setBookingTime(time)} disabled={!settedDate}>
                            {parseInt(time.substr(0, time.length - 1)) - 12 + ' : ' + time.substr(time.length - 3)} pm
                          </Button>
                        )
                      } else {
                        return null
                      }

                    })
                  : <p> There is no availability</p>
                }
              </Grid>

              <Grid item xs={12} md={4} className={classes.dayItem}>
                <h3 className={classes.h3}>Evening</h3>
                {
                  times.length > 0 ?
                    times.map((time, index) => {
                      if(parseInt(time) >= 17 && parseInt(time) < 20) {
                        return (
                          <Button key={index} className={settedTime === time ? classes.timeActivity :classes.time} onClick={() =>this.setBookingTime(time)} disabled={!settedDate}>
                          {parseInt(time.substr(0, time.length - 1)) - 12 + ' : ' + time.substr(time.length - 3)} pm
                          </Button>
                        )
                      } else {
                        return null
                      }

                    })
                  : <p> There is no availability</p>
                }
              </Grid>

            </Grid>
          </div>
        </div>
      )
    } else {
      return (
        <CircularProgress className={classes.progress} />
      )
    }

  }
}

PickDate.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  pickDate,
  getBookingDatesRequest
} = Actions;

function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.user
  };
}


const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  pickDate,
  getBookingDatesRequest
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(PickDate)
