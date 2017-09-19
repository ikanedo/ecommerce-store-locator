import React, { PropTypes } from 'react';

export default function CollectionPostcodeSearch({ children }) {
  return (
    <div>
      { children }
    </div>
  );
}

CollectionPostcodeSearch.propTypes = {
  children: PropTypes.any
};
