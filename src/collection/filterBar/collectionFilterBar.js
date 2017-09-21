import React, { PropTypes } from 'react';

export default function CollectionFilterBar({ children, hasLocations }) {
  if (!hasLocations) {
    return null;
  }

  return (
    <div className="collection-filter">
      <div className="collection-filter__inner">
        { children }
      </div>
    </div>
  );
}

CollectionFilterBar.propTypes = {
  hasLocations: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
