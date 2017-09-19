import React, { Component, PropTypes } from 'react';
import CollectionLocation from '../collectionLocation';

function getFilteredLocations(locations, pageNumber) {
  const numberOfItems = 5;
  const index = pageNumber - 1;
  const indexStart = index * numberOfItems;
  const indexEnd = indexStart + numberOfItems;

  return locations.slice(0, indexEnd);
}

function hasMoreResults(locations, pageNumber) {
  const filteredLength = getFilteredLocations(locations, pageNumber).length;
  return filteredLength < locations.length;
}

export default class CollectionLocationList extends Component {
  constructor() {
    super();

    this.moreResultsBtn = this.moreResultsBtn.bind(this);
  }

  moreResultsBtn() {
    const {
      locations,
      pageNumber,
      handleShowMoreClick
    } = this.props;

    if (!hasMoreResults(locations, pageNumber)) {
      return <span />;
    }

    return (
      <div className="collection-location-list__see-more">
        <button className="collection-list__btn button button--tertiary" onClick={ () => handleShowMoreClick(pageNumber + 1) }>
          See more collection points
        </button>
      </div>
    );
  }

  render() {
    const {
      locations,
      pageNumber,
      activeLocation,
      handleLocationClick,
      deliveryDateRLC,
      deliveryDateDTS,
      hasMoreThanOneItemWithDifferentDates
    } = this.props;

    return (
      <div className="collection-location-list">
        <div className="collection-location-list__items">
          {
            getFilteredLocations(locations, pageNumber).map(
              location =>
                <CollectionLocation
                  hasMoreThanOneItemWithDifferentDates={ hasMoreThanOneItemWithDifferentDates }
                  name="collection-location"
                  checked={ location.id === activeLocation.id }
                  key={ `${location.name}${location.id}` }
                  handleLocationClick={ handleLocationClick }
                  location={ location }
                  deliveryDateRLC={ deliveryDateRLC }
                  deliveryDateDTS={ deliveryDateDTS }
                  deliveryModeCode={ activeLocation.type }
                />
            )
          }
        </div>
        { this.moreResultsBtn() }
      </div>
    );
  }
}

CollectionLocationList.propTypes = {
  handleLocationClick: PropTypes.func.isRequired,
  activeLocation: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  handleShowMoreClick: PropTypes.func.isRequired,
  deliveryDateRLC: PropTypes.string.isRequired,
  deliveryDateDTS: PropTypes.string.isRequired,
  hasMoreThanOneItemWithDifferentDates: PropTypes.bool.isRequired
};
