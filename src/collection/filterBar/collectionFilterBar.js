import React, { PropTypes } from 'react';

export default function CollectionFilterBar({ children, hasLocations }) {
  if (hasLocations) {
    return (
      <div className="collection-filter">
        <div className="collection-filter__inner">
          { children }
        </div>
      </div>
    );
  }

  return <span />;
}

CollectionFilterBar.propTypes = {
  hasLocations: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
