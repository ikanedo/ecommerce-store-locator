import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'src/icons/icon';
import FormGroup from 'src/forms/formGroup';
import * as FormActions from 'src/forms/formActions';
import * as CONST from '../collectionConstants';

export class CollectionViewChange extends Component {
  constructor(props) {
    super(props);

    this.triggerChangeView = this.triggerChangeView.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);

    this.changeViewFormName = `${props.name}-changeView`;
    this.validation = {
      rules: {},
      messages: {}
    };
  }

  triggerChangeView() {
    this.props.triggerValidate(this.changeViewFormName);
  }

  handleChangeView({ collectionFilter }) {
    this.props.onChange(collectionFilter);
  }

  render() {
    return (
      <FormGroup
        formName={ this.changeViewFormName }
        handleValidForm={ this.handleChangeView }
        validation={ this.validation }
      >
        <ul className="collection-filter__views">
          <li className="collection-filter__view-type">
            <label htmlFor="listView">
              <input
                onChange={ this.triggerChangeView }
                checked={ this.props.activeType === CONST.LIST_VIEW }
                type="radio"
                id="listView"
                value={ CONST.LIST_VIEW }
                name="collectionFilter"
              />
              <span className="collection-filter__view-icon">
                <Icon name="list-view" />
              </span>
              <span className="collection-filter__view-name">
                List view
              </span>
            </label>
          </li>
          <li className="collection-filter__view-type">
            <label htmlFor="mapView">
              <input
                onChange={ this.triggerChangeView }
                checked={ this.props.activeType === CONST.MAP_VIEW }
                type="radio"
                id="mapView"
                value={ CONST.MAP_VIEW }
                name="collectionFilter"
              />
              <span className="collection-filter__view-icon">
                <Icon name="map-view" />
              </span>
              <span className="collection-filter__view-name">
                Map view
              </span>
            </label>
          </li>
        </ul>
      </FormGroup>
    );
  }
}

CollectionViewChange.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  triggerValidate: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired
};

export default connect(null, FormActions)(CollectionViewChange);
