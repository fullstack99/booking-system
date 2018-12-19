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
const _ = require('lodash');

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
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class AdminUser extends Component {

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
        { id: 'firstName', label: 'First Name'},
        { id: 'lastName', label: 'Last Name'},
        { id: 'email', label: 'Email' },
        { id: 'dob', label: 'DOB' },
        { id: 'phone', label: 'Phone'},
        { id: 'type', label: 'Type'},
        { id: 'doctorName', label: 'Doctor Name'},
        { id: 'license', label: 'License'}
      ]
    }
  }

  componentDidMount() {
    this.props.getUsersRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isFetched) {
      const data = _.orderBy(nextProps.user.users, ['created_at'],['desc']);
      this.setState({ data: data });
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

  goToDetailPage = user => {
    this.props.push(`/admin/user/${user._id}`);
  }

  getType = val => {
    console.log(type)
    let type = 'visionaire'
    if (val && val.indexOf('single') > -1) {
      type = 'single'
    }
    return type
  }

  render() {
    const { classes, user, theme } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, rows } = this.state;
console.log(data);
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
                          className={classes.row}
                          onClick={() => this.goToDetailPage(n)}
                        >
                          <TableCell component="th" scope="row">
                            {n.firstName}
                          </TableCell>
                          <TableCell>{n.lastName}</TableCell>
                          <TableCell>{n.email}</TableCell>
                          <TableCell>{n.dob ? moment(n.dob).format('YYYY-MM-DD') : null}</TableCell>
                          <TableCell>{n.phone}</TableCell>
                          <TableCell>{this.getType(n.type)}</TableCell>
                          <TableCell>{n.doctorName}</TableCell>
                          <TableCell>{n.license}</TableCell>
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

AdminUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

const { getUsersRequest } = Actions;

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  replace,
  getUsersRequest,
}, dispatch)

export default compose(
  withStyles(styles), connect(mapStateToProps, mapDispatchToProps)
)(AdminUser)