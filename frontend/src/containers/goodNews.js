import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { push, replace } from 'react-router-redux'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
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
    color: '#8bb4c2',
    marginLeft: -45
  },
  confirmMail: {
    color: '#8bb4c2',
  }
})

class GoodNews extends Component {

  render() {

    const { classes, user } = this.props

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
              </IconButton>good news</div>
            <div className={classes.link}>better vision awaits</div>
          </div>
        </div>
        <div className={classes.contents}>
          <div className={classes.container}>
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <div className={classes.grid}>
                <div className={classes.in}>
                  <div className={classes.h1}>{user.GoodNewsTitle}</div>
                  {/* <div className={classes.p1}>{user.GoodNewsContent}</div> */}
                  <div className={classes.p1}>Looks like you already have an exam pending.<br/> Please reschedule or cancel your current appointment prior to booking a new exam.</div>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    )
  }
}

GoodNews.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({
  auth: { user },
}) => ({
  user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(GoodNews)
