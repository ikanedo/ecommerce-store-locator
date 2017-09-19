import React, { PropTypes } from 'react';

export default function CollectionPostcodeSearchError({ msg }) {
  if (!msg) {
    return <span />;
  }

  return (
    <div className="collection-search__error">{ msg }</div>
  );
}

CollectionPostcodeSearchError.propTypes = {
  msg: PropTypes.string
};
