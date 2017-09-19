import React, { PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import SeciontHeader from 'src/sectionHeader/sectionHeader';
import CollectionLocation from '../collectionLocation';

export default function ClosestStore(props) {
  const {
    isDTSAvailable,
    location,
    deliveryDateRLC,
    deliveryDateDTS,
    activeLocation,
    handleLocationClick,
    hasMoreThanOneItemWithDifferentDates
  } = props;

  if (!isDTSAvailable || isEmpty(location)) {
    return <span />;
  }

  return (
    <div>
      <SeciontHeader icon="beaverbrooks-store" title="Your nearest Beaverbrooks store" />
      <section className="delivery-section">
        <CollectionLocation
          hasMoreThanOneItemWithDifferentDates={ hasMoreThanOneItemWithDifferentDates }
          name="collection-location-closest"
          handleLocationClick={ handleLocationClick }
          checked={ location.id === activeLocation.id }
          className="collection-map__active-location"
          location={ location }
          deliveryDateRLC={ deliveryDateRLC }
          deliveryDateDTS={ deliveryDateDTS }
          deliveryModeCode={ activeLocation.type }
        />
      </section>
    </div>
  );
}

ClosestStore.propTypes = {
  isDTSAvailable: PropTypes.bool.isRequired,
  location: PropTypes.object,
  activeLocation: PropTypes.object,
  deliveryDateDTS: PropTypes.string.isRequired,
  deliveryDateRLC: PropTypes.string.isRequired,
  handleLocationClick: PropTypes.func.isRequired,
  hasMoreThanOneItemWithDifferentDates: PropTypes.bool.isRequired
};
