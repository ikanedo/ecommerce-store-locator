import React from 'react';
import PropTypes from 'prop-types';

export default function CollectionPostcodeSearch(props) {
  const {
    children,
    handleChangeStore,
    hasLocations,
    locations,
    postcode,
    isChangeStore
  } = props;

  /* eslint-disable */
  const msg = (
    <div className="collection-search__msg">
      <p>{locations.length} stores found near {postcode}. Select a store from the list/map and press 'Select Store' to continue.</p>
      <button className="collection-search__change" onClick={handleChangeStore}>Change Location</button>
    </div>
  );
  /* eslint-enable */

  return (
    <div className="collection-search__container">
      {hasLocations && !isChangeStore && msg}
      {(!hasLocations || isChangeStore) && children}
    </div>
  );
}

CollectionPostcodeSearch.propTypes = {
  children: PropTypes.any,
  postcode: PropTypes.string,
  locations: PropTypes.array.isRequired,
  hasLocations: PropTypes.bool.isRequired,
  isChangeStore: PropTypes.bool.isRequired,
  handleChangeStore: PropTypes.func.isRequired
};
