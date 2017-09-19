import React, { PropTypes } from 'react';

export default function CollectionResults({ hasResults, children }) {
  if (!hasResults) {
    return <span />;
  }

  return (
    <div id="collection-results" className="collection-view__results">
      { children }
    </div>
  );
}

CollectionResults.propTypes = {
  hasResults: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
