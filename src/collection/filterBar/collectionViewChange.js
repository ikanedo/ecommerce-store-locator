import React, { Component, PropTypes } from 'react';
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
    return (
      <ul className="collection-filter__views">
        <li className="collection-filter__view-type">
          <label htmlFor="listView">
            <input
              onChange={ this.handleChangeView }
              checked={ this.props.activeType === CONST.LIST_VIEW }
              type="radio"
              id="listView"
              value={ CONST.LIST_VIEW }
              name="collectionFilter"
            />
            <span className="collection-filter__view-name">
              List view
            </span>
          </label>
        </li>
        <li className="collection-filter__view-type">
          <label htmlFor="mapView">
            <input
              onChange={ this.handleChangeView }
              checked={ this.props.activeType === CONST.MAP_VIEW }
              type="radio"
              id="mapView"
              value={ CONST.MAP_VIEW }
              name="collectionFilter"
            />
            <span className="collection-filter__view-name">
              Map view
            </span>
          </label>
        </li>
      </ul>
    );
  }
}

CollectionViewChange.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired
};

export default connect()(CollectionViewChange);
