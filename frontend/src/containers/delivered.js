import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'

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
    fontFamily: 'Raleway ExtraLight'
  },
  contents: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 'calc(100vh - 366px)',
  },
  grid: {
    margin: '100px 0',
    [theme.breakpoints.down('md')]: {
      margin: '50px 0',
    },
  },
  gridx: {
    padding: '0 25px',
    [theme.breakpoints.down('md')]: {
      padding: '10px 0',
    },
  },
  grid1: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#cfe1e3',
    height: '100%',
    textAlign: 'center',
    padding: '50px 10px',
  },
  grid2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f5f1',
    height: '100%',
    textAlign: 'center',
    padding: '50px 10px',
  },
  item: {
    marginBottom: 10,
    cursor: 'pointer',
  },
  h1: {
    fontSize: 12,
    fontWeight: 500,
    color: '#4e4f4f',
    lineHeight: 1.5
  },
  h2: {
    fontSize: 10,
    fontWeight: 300,
    color: '#4e4f4f',
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
  dollar: {
    fontSize: 18,
    fontWeight: 300,
    padding: 0,
    margin: 0,
    fontFamily: 'Raleway Regular'
  },
  date: {
    fontSize: 14,
    paddingTop: 7,
    margin: 0,
    fontFamily: 'Raleway Regular'
  },
  number: {
    fontSize: 22,
    paddingTop: 0,
    margin: 0,
    fontFamily: 'Raleway Regular'
  },
  or: {
    width: '100%',
    textAlign: 'center',
    color: '#4e4f4f',
    fontFamily: 'Raleway Regular'
  },
  or1: {
    width: '100%',
    textAlign: 'center',
    color: '#4e4f4f',
    fontFamily: 'Raleway SemiBold'
  },
  p1: {
    display: 'flex',
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4f4f',
    padding: '5px 0',
    fontFamily: 'Raleway Regular'
  },
  p2: {
    display: 'flex',
    fontSize: 11,
    textAlign: 'center',
    color: '#4e4f4f',
    fontFamily: 'Raleway Thin'
  },
  p3: {
    display: 'flex',
    fontSize: 12,
    textAlign: 'center',
    color: '#4e4f4f',
    paddingTop: 20,
    fontFamily: 'Raleway Light'
  },
  p4: {
    fontSize: 18,
    fontWeight: 300,
    textAlign: 'center',
    color: '#4e4f4f',
    padding: '5px 0',
    fontFamily: 'Raleway Light'
  }
})

class Delivered extends Component {

  navigate = to => () => {
    this.props.push(to)
  }

  checkType(value, event) {
    const data = {
      type: value,
      location: 'delivered'
    }
    this.props.setSubscriptionType(data);
    this.props.push('/pickDate');
  }

  render() {

    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.contentHeader}>
          <div className={classes.container}>
            <div className={classes.title}>delivered</div>
            <div className={classes.link}>Just lift a finger. we got you</div>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Grid container className={classes.grid} justify="center">
              <Grid item xs={12} md={6} className={classes.gridx}>
                <Zoom in={true}>
                  <div className={classes.grid1}>
                    <div className={classes.p1}>GLASSES PRESCRIPTION</div>
                    <div className={classes.or1}>or</div>
                    <div className={classes.p4}>CONTACT LENS RENEWAL</div>
                    <div className={classes.box} onClick={this.checkType.bind(this, '$150/single exam')}>
                      <div className={classes.p1}>SINGLE EXAM</div>
                      <div className={classes.p1}>
                        <p className={classes.dollar}>$</p>
                        <p className={classes.number}>150</p>
                      </div>
                    </div>
                    <div className={classes.or}>or</div>
                    <div className={classes.box} onClick={this.checkType.bind(this, '$24.99/month')}>
                      <div className={classes.p1}>VISIONAIRE</div>
                      <div className={classes.p2}>( subscription )</div>
                      <div className={classes.p1}>
                        <p className={classes.dollar}>$</p>
                        <p className={classes.number}>24.</p>
                        <p className={classes.dollar}>99</p>
                        <p className={classes.date}>/month</p>
                      </div>
                      <div className={classes.p2}>Exam (annual) + Glasses (cool)</div>
                    </div>
                  </div>
                </Zoom>
              </Grid>
              <Grid item xs={12} md={6} className={classes.gridx}>
                <Zoom in={true} style={{ transitionDelay: 100 }}>
                  <div className={classes.grid2}>
                    <div className={classes.p1}>COMPLETE EYE EXAM</div>
                    <div className={classes.p3}>On a mobile bus customized<br />for an amazing experience</div>
                    <div className={classes.box} onClick={this.checkType.bind(this, '$300/single exam')}>
                      <div className={classes.p1}>SINGLE EXAM</div>
                      <div className={classes.p1}>
                        <p className={classes.dollar}>$</p>
                        <p className={classes.number}>300</p>
                      </div>
                    </div>
                    <div className={classes.or}>or</div>
                    <div className={classes.box} onClick={this.checkType.bind(this, '$34.99/month')}>
                      <div className={classes.p1}>VISIONAIRE</div>
                      <div className={classes.p2}>( subscription )</div>
                      <div className={classes.p1}>
                        <p className={classes.dollar}>$</p>
                        <p className={classes.number}>34.</p>
                        <p className={classes.dollar}>99</p>
                        <p className={classes.date}>/month</p>
                      </div>
                      <div className={classes.p2}>Exam (annual) + Glasses (cool)</div>
                    </div>
                  </div>
                </Zoom>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

Delivered.propTypes = {
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
)(Delivered)
