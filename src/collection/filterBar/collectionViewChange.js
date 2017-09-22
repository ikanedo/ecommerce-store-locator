import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CONST from '../collectionConstants';

export class CollectionViewChange extends Component {
  constructor(props) {
    super(props);
    this.handleChangeView = this.handleChangeView.bind(this);
  }

  handleChangeView(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const {
      activeType
    } = this.props;
    const isListView = activeType === CONST.LIST_VIEW;
    const isMapView = activeType === CONST.MAP_VIEW;

    return (
      <div className="collection-filter__views">
        {
          !isListView &&
          <label className="button collection-filter__btn" htmlFor="listView">
            <input
              onChange={this.handleChangeView}
              checked={activeType === CONST.LIST_VIEW}
              type="radio"
              id="listView"
              value={CONST.LIST_VIEW}
              name="collectionFilter"
            />
            View list of stores
          </label>
        }
        {
          !isMapView &&
          <label className="button collection-filter__btn" htmlFor="mapView">
            <input
              onChange={this.handleChangeView}
              checked={activeType === CONST.MAP_VIEW}
              type="radio"
              id="mapView"
              value={CONST.MAP_VIEW}
              name="collectionFilter"
            />
            View stores on map
          </label>
        }
      </div>
    );
  }
}

CollectionViewChange.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired
};

export default connect()(CollectionViewChange);
