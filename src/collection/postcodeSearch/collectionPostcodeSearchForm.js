import React, { Component, PropTypes } from 'react';
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
        <Form
          formName={this.formName}
          handleValidForm={(data) => handleResults(data.postcode)}
          validation={this.validation}
        >
          <div className="form-input">
            <div className="form-input">
              <input className="form-input__input" type="text" name="postcode" value="" id="collection-postcode" />
              <label className="form-input__label" htmlFor="collection-postcode">Search stores by postcode</label>
            </div>
            <FormError forInput="postcode" />
          </div>
          <button
            className={`button button--tertiary collection-search__btn ${isLoading ? '_is-loading' : ''}`}
            disabled={isLoading}
          >
            <span className="button__loader button__loader--tertiary"></span>
            <span className="button__text">Search</span>
          </button>
        </Form>
        <hr />
        {
          isGeolocationAvailable &&
          <button
            onClick={this.handleSetCurrentLocation}
            className="button secondary"
            disabled={!hasGeolocation}
            title={geolocationError}
          >
            {isLoadingLocation ? 'loading' : 'Use current location'}
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
