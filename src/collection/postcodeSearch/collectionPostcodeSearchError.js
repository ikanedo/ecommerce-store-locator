import React from 'react';
import PropTypes from 'prop-types';

export default function CollectionPostcodeSearchError({ msg, handleSearchAgain }) {
  if (!msg) {
    return <span />;
  }

  return (
    <div>
      <div className="collection-search__error">{msg}</div>
      <button className="collection-search__all-stock">View all stores with stock</button>
      <button className="collection-search__btn--secondary" onClick={handleSearchAgain}>Search again</button>
    </div>
  );
}

CollectionPostcodeSearchError.propTypes = {
  msg: PropTypes.string,
  handleSearchAgain: PropTypes.func.isRequired
};
