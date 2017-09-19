import React, { PropTypes } from 'react';

export default function CollectionViewHolder({ activeType, children, type }) {
  return (
    <div className={ `collection-view__${type.toLowerCase()} ${activeType !== type ? '_is-hidden' : ''}` }>
      { children }
    </div>
  );
}

CollectionViewHolder.propTypes = {
  activeType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
