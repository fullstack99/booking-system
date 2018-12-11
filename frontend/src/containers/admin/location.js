import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import { bindActionCreators, compose } from 'redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

import { Creators as Actions } from '../../actions';

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
  formInput: {
    color: '#717171',
    width: 400,
    maxWidth: '100%',
    "&:before": {
      borderColor: '#717171'
    },
    "&:after": {
      borderColor: '#717171'
    }
  },
  dropdownList: {
    marginTop: 15,
    fontSize: 16,
    lineHeight: 1.8
  }
});

class AdminLocation extends Component {

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
        { id: '_id', label: 'License #'},
        { id: 'firstName', label: 'First Name' },
        { id: 'lastName', label: 'Last Name' },
        { id: 'email', label: 'Email' },
        { id: 'doctorName', label: 'Doctor Name'}
      ],
      address: '',
      address1: '',
      address2: ''
    }
  }

  componentDidMount() {
    this.props.getUsersRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isFetched) {
      this.setState({ data: nextProps.user.users });
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

  handleChange = address => {
    this.setState({ address });
  };

  setAddress = address => {
    this.setState({ address1:  address.formattedSuggestion.mainText});
    this.setState({ address2:  address.formattedSuggestion.secondaryText});
  }


  goToDetailPage = user => {
    this.props.push(`/admin/user/${user._id}`);
  }

  render() {
    const { classes, user, theme } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, rows } = this.state;

    if (user.isFetched) {
      return (
        <React.Fragment>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                  })}
                  className={classes.formInput}
                />
                <div className={classes.dropdownList}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span onClick={() => this.setAddress(suggestion)}>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </React.Fragment>
      );
    } else {
      return (
        <CircularProgress className={classes.progress} />
      )
    }

  }
}

AdminLocation.propTypes = {
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
)(AdminLocation)