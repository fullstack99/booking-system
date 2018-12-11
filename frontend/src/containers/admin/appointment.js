import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import { bindActionCreators, compose } from 'redux';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Creators as Actions } from '../../actions';
import AdminTableHead from '../../components/admin/TableHeader';

const styles = theme => ({
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AdminAppointment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'appointment',
      data: [],
      selected: [],
      page: 0,
      rowsPerPage: 5,
      open: false,
      rows: [
        { id: 'appointment', label: 'Appointment For' },
        { id: 'start', label: 'Start Time' },
        { id: 'end', label: 'End Time' },
        { id: 'type', label: 'Sub Subscription Type' },
        { id: 'status', label: 'Appointment Status:' },
        { id: 'location', label: 'Location' },
        { id: 'action', label: 'Action' },
        // { id: 'pending', label: ''}
      ]
    }
  }

  componentWillMount() {
    this.props.getAppointmentRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isFetched) {
      this.setState({ data: nextProps.user.appointments });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = row => event => {
    this.props.updateAppointmentStatusRequest({
      id: row._id,
      status: event.target.value
    });
  };

  getEndTime = startTime => {
    const endTime = parseInt(startTime.substr(0, startTime.length - 1)) + 1 + ' : ' + startTime.substr(startTime.length - 3);
    return endTime;
  }

  render() {
    const { classes, user, theme } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, rows } = this.state;

    if (user.isFetched) {
      return (
        <Paper>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <AdminTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
                rows={rows}
              />
              <TableBody>
                {
                  data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={n._id}
                        >
                          <TableCell component="th" scope="row">
                            {n.appointment}
                          </TableCell>
                          <TableCell>{n.bookingDate + ' ' + n.bookingTime}</TableCell>
                          <TableCell>{n.bookingDate + ' ' + this.getEndTime(n.bookingTime)}</TableCell>
                          <TableCell>{n.type}</TableCell>
                          <TableCell>{n.status}</TableCell>
                          <TableCell>{n.location}</TableCell>
                          <TableCell>
                            <Select
                              native
                              onChange={this.handleChange(n)}
                              inputProps={{
                                name: 'actionType',
                                id: 'actionType-native-simple',
                              }}
                            >
                              <option value="">Select Action</option>
                              <option value="cancel">Cancel Appointment</option>
                              <option value="reschedule">Reschedule </option>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    }
                    )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      );
    } else {
      return (
        <CircularProgress className={classes.progress} />
      )
    }

  }
}

AdminAppointment.propTypes = {
  classes: PropTypes.object.isRequired,
};

const { getAppointmentRequest, updateAppointmentStatusRequest } = Actions;

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  getAppointmentRequest,
  updateAppointmentStatusRequest
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(AdminAppointment)