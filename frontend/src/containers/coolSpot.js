import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'

import { Creators as Actions } from '../actions'

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
    minHeight: 'calc(100vh - 366px)',
    backgroundColor: '#cfe1e3',
  },
  grid: {
    margin: '100px 0',
    [theme.breakpoints.down('md')]: {
      margin: '50px 0',
    },
  },
  grid1: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderRight: '1px solid #2f2f2f',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      textAlign: 'center',
      border: 'none',
    },
  },
  grid2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
    justifyContent: 'space-around'
  },
  item: {
    cursor: 'pointer',
    padding: 10,
    textAlign: 'left'
  },
  itemActivity: {
  //  backgroundColor: '#ffffff',
    padding: 10,
    textAlign: 'left'
  },
  h1Activity: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1.5,
    fontFamily: 'Raleway Regular'
  },
  h2Activity: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Raleway Regular'
  },

  h1: {
    fontSize: 15,
    fontWeight: 500,
    color: '#2f2f2f',
    lineHeight: 1.5,
    fontFamily: 'Raleway Regular'
  },
  h2: {
    fontSize: 12,
    fontWeight: 300,
    color: '#2f2f2f',
    fontFamily: 'Raleway Regular'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 120,
    border: '1px solid white',
    margin: '20px 0',
    cursor: 'pointer',
  },
  boxActivity: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 120,
    border: '2px solid #ffffff',
    margin: '20px 0',
    cursor: 'pointer',
  },
  dollar: {
    fontSize: 18,
    padding: 0,
    margin: 0,
    fontFamily: 'Raleway Regular'
  },
  date: {
    fontSize: 14,
    paddingTop: 7,
    margin: 0,
  },
  number: {
    fontSize: 22,
    paddingTop: 0,
    margin: 0,
    fontFamily: 'Raleway Regular'
  },
  or: {
    width: 170,
    textAlign: 'center',
    padding: '15px 0',
    color: '#2f2f2f',
    fontFamily: 'Raleway SemiBold'
  },
  p1: {
    display: 'flex',
    fontSize: 18,
    textAlign: 'center',
    color: '#2f2f2f',
    padding: '5px 0',
    fontWeight: 300,
    fontFamily: 'Raleway Regular'
  },
  p1Activity: {
    display: 'flex',
    fontSize: 18,
    textAlign: 'center',
    color: '#000000',
    padding: '5px 0',
    fontFamily: 'Raleway SemiBold'
  },
  p2: {
    display: 'flex',
    fontSize: 11,
    textAlign: 'center',
    color: '#2f2f2f',
    fontWeight: 100,
    fontFamily: 'Raleway Regular'
  },
  p2Activity: {
    display: 'flex',
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Raleway SemiBold'
  },
})

class CoolSport extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: '',
      location: ''
    }
  }

  navigate = to => () => {
    this.props.push(to)
  }

  checkType(value, event) {
    this.setState({ type: value});
    if(this.state.location !== '') {
      const data = {
        location: this.state.location,
        type: value
      }
      this.props.setSubscriptionType(data);
      this.props.push('/pickDate');
    }

  }

  checkLocatoin(value, event) {
    this.setState({ location: value});
    if(this.state.type !== '') {
      const data = {
        location: value,
        type: this.state.type
      }
      this.props.setSubscriptionType(data);
      this.props.push('/pickDate');
    }
  }

  render() {

    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <div className={classes.container}>
            <div className={classes.title}>in a really cool spot nearby</div>
            <div className={classes.link}>you gotta 'see'</div>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <Grid container className={classes.grid} justify="center">
                <Grid item xs={12} md={6} className={classes.grid1}>
                  <div className={ this.state.location === 'downtown LA' ? classes.itemActivity : classes.item}  onClick={this.checkLocatoin.bind(this, 'downtown LA')}>
                    <div className={this.state.location === 'downtown LA' ? classes.h1Activity : classes.h1}>downtown LA</div>
                    <div className={this.state.location === 'downtown LA' ? classes.h2Activity : classes.h2}>555 West 5th Street, 34th floor</div>
                  </div>
                  <div className={ this.state.location === 'Long Beach' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Long Beach')}>
                    <div className={this.state.location === 'Long Beach' ? classes.h1Activity : classes.h1}>Long Beach</div>
                    <div className={this.state.location === 'Long Beach' ? classes.h2Activity : classes.h2}>100 W Broadway</div>
                  </div>
                  <div className={ this.state.location === 'Santa Monica' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Santa Monica')}>
                    <div className={this.state.location === 'Santa Monica' ? classes.h1Activity : classes.h1}>Santa Monica</div>
                    <div className={this.state.location === 'Santa Monica' ? classes.h2Activity : classes.h2}>520 BroadWay 312 Arizona Ave</div>
                  </div>
                  <div className={ this.state.location === 'Manhattan Beach' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Manhattan Beach')}>
                    <div className={this.state.location === 'Manhattan Beach' ? classes.h1Activity : classes.h1}>Manhattan Beach</div>
                    <div className={this.state.location === 'Manhattan Beach' ? classes.h2Activity : classes.h2}>1240 Rosecrans Ave</div>
                  </div>
                  <div className={ this.state.location === 'Hollywood' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Hollywood')}>
                    <div className={this.state.location === 'Hollywood' ? classes.h1Activity : classes.h1}>Hollywood</div>
                    <div className={this.state.location === 'Hollywood' ? classes.h2Activity : classes.h2}>7083 Hollywood Blvd</div>
                  </div>
                  <div className={ this.state.location === 'Culver City' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Culver City')}>
                    <div className={this.state.location === 'Culver City' ? classes.h1Activity : classes.h1}>Culver City</div>
                    <div className={this.state.location === 'Culver City' ? classes.h2Activity : classes.h2}>5792 West Jefferson Blvd</div>
                  </div>
                  <div className={ this.state.location === 'Playa Vista' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Playa Vista')}>
                    <div className={this.state.location === 'Playa Vista' ? classes.h1Activity : classes.h1}>Playa Vista</div>
                    <div className={this.state.location === 'Playa Vista' ? classes.h2Activity : classes.h2}>12655 W. Jefferson Blvd</div>
                  </div>
                  <div className={ this.state.location === 'La Brea' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'La Brea')}>
                    <div className={this.state.location === 'La Brea' ? classes.h1Activity : classes.h1}>La Brea</div>
                    <div className={this.state.location === 'La Brea' ? classes.h2Activity : classes.h2}>925 N La Brea Ave, 4th floor</div>
                  </div>
                  <div className={ this.state.location === 'Burbank' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Burbank')}>
                    <div className={this.state.location === 'Burbank' ? classes.h1Activity : classes.h1}>Burbank</div>
                    <div className={this.state.location === 'Burbank' ? classes.h2Activity : classes.h2}>3900 W Alameda Ave</div>
                  </div>
                  <div className={ this.state.location === 'Pasadena' ? classes.itemActivity : classes.item} onClick={this.checkLocatoin.bind(this, 'Pasadena')}>
                    <div className={this.state.location === 'Pasadena' ? classes.h1Activity : classes.h1}>Pasadena</div>
                    <div className={this.state.location === 'Pasadena' ? classes.h2Activity : classes.h2}>177 E Colorado Blvd</div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid2}>
                  <div className={ this.state.type === '$80/single exam' ? classes.boxActivity : classes.box} onClick={this.checkType.bind(this, '$80/single exam')}>
                    <div className={ this.state.type === '$80/single exam' ? classes.p1Activity : classes.p1} >SINGLE EXAM</div>
                    <div className={ this.state.type === '$80/single exam' ? classes.p1Activity : classes.p1} >
                      <p className={classes.dollar}>$</p>
                      <p className={classes.number}>80</p>
                    </div>
                  </div>
                  <div className={classes.or}>
                    or
                      </div>
                  <div className={ this.state.type === '$14.00/month' ? classes.boxActivity : classes.box} onClick={this.checkType.bind(this, '$14.00/month')}>
                    <div className={ this.state.type === '$14.00/month' ? classes.p1Activity : classes.p1} >VISIONAIRE</div>
                    <div className={ this.state.type === '$14.00/month' ? classes.p2Activity : classes.p2}>( subscription )</div>
                    <div className={ this.state.type === '$14.00/month' ? classes.p1Activity : classes.p1} >
                      <p className={classes.dollar}>$</p>
                      <p className={classes.number}>14.</p>
                      <p className={classes.dollar}>00</p>
                      <p className={classes.date}>/month</p>
                    </div>
                    <div className={ this.state.type === '$14.00/month' ? classes.p2Activity : classes.p2}>Exam (annual) + Glasses (cool)</div>
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

CoolSport.propTypes = {
  classes: PropTypes.object.isRequired,
}

const {
  setSubscriptionType
} = Actions;

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  setSubscriptionType
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(CoolSport)
