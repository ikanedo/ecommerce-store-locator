import React from 'react';
import PropTypes from 'prop-types';

export default function CollectionPostcodeSearchError({ msg }) {
  if (!msg) {
    return <span />;
  }

  return (
    <div className="collection-search__error">{msg}</div>
  );
}

CollectionPostcodeSearchError.propTypes = {
  msg: PropTypes.string
};
