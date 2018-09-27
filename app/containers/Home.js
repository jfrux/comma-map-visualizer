import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { filterTable } from '../actions';
// import { filterableTable } from '../styles/filterableTable.scss';

const Home = ({ filter, onFilter }) => {
    let input;

    return (
      <App />
    );
};

Home.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
