import React, { Component, PropTypes } from 'react';
import { Form, FormError } from 'react-redux-simple-validate';

export default class CollectionPostcodeSearchForm extends Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    const {
      handleResults,
      isLoading
    } = this.props;

    return (
      <div className="collection-search">
        <Form
          formName={ this.formName }
          handleValidForm={ handleResults }
          validation={ this.validation }
        >
          <div className="form-input">
            <div className="form-input">
              <input className="form-input__input" type="text" name="postcode" value="" id="collection-postcode" />
              <label className="form-input__label" htmlFor="collection-postcode">Enter your postcode here</label>
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
  isLoading: PropTypes.bool.isRequired
};
