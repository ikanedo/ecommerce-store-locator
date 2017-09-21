import React, { PropTypes } from 'react';

export default function FormRadio({ name, value, ...inputProps }) {
  return (
    <label className="form-checkbox" htmlFor={name}>
      <input
        name={ name }
        value={ value }
        { ...inputProps }
        className="form-checkbox__input"
        type="radio"
      />
      <div className="form-checkbox__radio"></div>
    </label>
  );
}

FormRadio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
