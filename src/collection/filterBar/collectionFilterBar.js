import React from 'react';
import PropTypes from 'prop-types';

export default function CollectionFilterBar({ children, hasLocations }) {
  if (!hasLocations) {
    return null;
  }

  return (
    <div className="collection-filter">
      {children}
    </div>
  );
}

CollectionFilterBar.propTypes = {
  hasLocations: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
