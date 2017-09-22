import React from 'react';
import PropTypes from 'prop-types';
import CollectionLocation from '../collectionLocation';

export default function CollectionLocationList(props) {
  const {
    locations,
    activeLocation,
    handleLocationClick
  } = props;

  return (
    <div className="collection-location-list">
      <div className="collection-location-list__items">
        {
          locations.map(
            location =>
              <CollectionLocation
                name="collection-location"
                checked={location.uid === activeLocation.uid}
                key={`${location.name}${location.uid}`}
                handleLocationClick={handleLocationClick}
                location={location}
              />
          )
        }
      </div>
    </div>
  );
}

CollectionLocationList.propTypes = {
  handleLocationClick: PropTypes.func.isRequired,
  activeLocation: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired
};
