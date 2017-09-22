import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormError } from 'react-redux-simple-validate';

export default class CollectionPostcodeSearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleSetCurrentLocation = this.handleSetCurrentLocation.bind(this);
    this.formName = `${props.name}-postcodeSearch`;
    this.validation = {
      rules: {
        postcode: {
          required: true
        }
      },
      messages: {
        postcode: {
          required: 'Please enter a valid postcode'
        }
      }
    };

    this.state = {
      geolocation: {},
      hasGeolocation: true,
      isGeolocationAvailable: false,
      isLoadingLocation: false
    };
  }

  componentWillMount() {
    if ('geolocation' in navigator) {
      this.setState({
        isGeolocationAvailable: true
      });
    }
  }

  handleSetCurrentLocation() {
    this.setState({
      isLoadingLocation: true
    });

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        isLoadingLocation: false,
        geolocation: position.coords
      });
      this.props.handleResults(`${position.coords.latitude},${position.coords.longitude}`);
    }, () => this.setState({
      hasGeolocation: false,
      geolocationError: 'Please enable geolocation in your browser to use this functionality',
      isLoadingLocation: false
    }));
  }

  render() {
    const {
      handleResults,
      isLoading
    } = this.props;

    const {
      isGeolocationAvailable,
      hasGeolocation,
      isLoadingLocation,
      geolocationError,
      geolocation
    } = this.state;

    return (
      <div className="collection-search">
        <h4>Collect in store</h4>
        <Form
          formName={this.formName}
          handleValidForm={(data) => handleResults(data.postcode)}
          validation={this.validation}
        >
          <label htmlFor="collection-postcode">Search stores by postcode</label>
          <div className="collection-search__input">
            <input type="text" name="postcode" value="" id="collection-postcode" />
            <FormError forInput="postcode" />
            <button
              className={`collection-search__icon icon-magnifying-glass ${isLoading ? '_is-loading' : ''}`}
              disabled={isLoading}
            >
              Search
            </button>
          </div>
        </Form>
        {
          isGeolocationAvailable &&
          <button
            className="collection-search__btn--secondary"
            onClick={this.handleSetCurrentLocation}
            disabled={!hasGeolocation}
            title={geolocationError}
          >
            {isLoadingLocation ? 'Finding stores near you' : 'Use current location'}
          </button>
        }
        {geolocation.latitude ? `${geolocation.latitude},${geolocation.longitude}` : ''}
      </div>
    );
  }
}

CollectionPostcodeSearchForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleResults: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
