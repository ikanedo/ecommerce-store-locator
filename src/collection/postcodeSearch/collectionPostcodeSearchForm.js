import React, { Component, PropTypes } from 'react';
import Form from 'src/forms/form';
import FormError from 'src/forms/formError';

export default class CollectionPostcodeSearchForm extends Component {
  constructor(props) {
    super(props);
    this.formName = `${props.name}-postcodeSearch`;
    this.validation = {
      rules: {
        postcode: {
          required: true,
          ukpostcode: true
        }
      },
      messages: {
        postcode: {
          required: 'Please enter a valid postcode',
          ukpostcode: 'Please enter a valid postcode'
        }
      }
    };
    this.getCollectionHeaderTxt = this.getCollectionHeaderTxt.bind(this);
  }

  getCollectionHeaderTxt() {
    const {
      isDTSAvailable,
      isRLCAvailable
    } = this.props;

    if (isDTSAvailable && isRLCAvailable) {
      return 'Collect your full order from a Beaverbrooks store or Post Office.';
    }

    if (isDTSAvailable) {
      return 'Collect your full order from a Beaverbrooks store';
    }

    return 'Collect your full order from a Post Office.';
  }

  render() {
    const {
      handleResults,
      isDTSAvailable,
      isRLCAvailable,
      isLoading
    } = this.props;

    return (
      <div className="collection-search">
        <p className="collection-search__desc">
          { this.getCollectionHeaderTxt() }
        </p>
        <Form
          formName={ this.formName }
          handleValidForm={ handleResults }
          validation={ this.validation }
        >
          <div className="form-input">
            <input type="hidden" value={isDTSAvailable} name="includeDts" />
            <input type="hidden" value={isRLCAvailable} name="includeRlc" />
            <div className="form-input">
              <input className="form-input__input" type="text" name="postcode" value="" />
              <label className="form-input__label">Enter your postcode here</label>
            </div>
            <FormError forInput="postcode" />
          </div>
          <button
            className={`button button--tertiary collection-search__btn ${isLoading ? '_is-loading' : ''}`}
            disabled={ isLoading }
          >
            <span className="button__loader button__loader--tertiary"></span>
            <span className="button__text">Find a collection point</span>
          </button>
        </Form>
      </div>
    );
  }
}

CollectionPostcodeSearchForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleResults: PropTypes.func.isRequired,
  isRLCAvailable: PropTypes.bool.isRequired,
  isDTSAvailable: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};
