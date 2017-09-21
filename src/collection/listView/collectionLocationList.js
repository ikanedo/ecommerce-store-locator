import React, { PropTypes } from 'react';
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
                checked={ location.id === activeLocation.id }
                key={ `${location.name}${location.id}` }
                handleLocationClick={ handleLocationClick }
                location={ location }
                deliveryModeCode={ activeLocation.type }
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
