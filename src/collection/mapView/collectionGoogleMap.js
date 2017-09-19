import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import google from 'google';
import * as utils from 'src/googleMaps/googleMapUtils';
import GoogleMapMarkers from 'src/googleMaps/googleMapMarkers';

export class CollectionGoogleMapRenderer {
  constructor({ id, postcode, locations, activeMapLocation, handleMarkerClick }) {
    return utils.createResponsiveMap(id, postcode).then(map => {
      const hasCurrectActiveLocation = locations.some(location => location.id === activeMapLocation.id);
      this.map = map;
      this.markers = new GoogleMapMarkers(map, 12, 13);
      this.markers.setMarkers(
        locations,
        hasCurrectActiveLocation ? activeMapLocation : locations[0],
        handleMarkerClick
      );
      this.markers.setCurrentLocationMarker(postcode);
      this.markers.changeMarkersOnZoom();
      return this;
    });
  }
}

export default class CollectionGoogleMap extends Component {
  constructor() {
    super();
    this.hasSearchChanged = this.hasSearchChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      activeMapLocation,
      isVisible
    } = this.props;
    const hasChangedLocation =
      (activeMapLocation.id !== nextProps.activeMapLocation.id);
    const isAlreadyInitialised =
      this.locationsMap && nextProps.activeMapLocation.distance;
    const hasSwitchedFromListToMap =
      isAlreadyInitialised && !isVisible && nextProps.isVisible;

    if (this.hasSearchChanged(nextProps)) {
      this.locationsMap = undefined;
    }

    if (hasSwitchedFromListToMap) {
      this.locationsMap.then(({ map }) => {
        google.maps.event.trigger(map, 'recenter');
      });
    }

    if (isAlreadyInitialised && hasChangedLocation) {
      this.locationsMap.then(mapObj => {
        mapObj.markers.toggleActiveMarker(nextProps.activeMapLocation);
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    const isViewingMapFirstTime = (nextProps.isVisible && !this.locationsMap);
    return this.hasSearchChanged(nextProps) || isViewingMapFirstTime;
  }

  hasSearchChanged(nextProps) {
    const {
      includeDts,
      includeRlc,
      postcode
    } = this.props;

    const hasPostcodeChanged = postcode !== nextProps.postcode;
    const hasFiltersChanged =
      (includeDts !== nextProps.includeDts)
      || (includeRlc !== nextProps.includeRlc);

    return hasPostcodeChanged || hasFiltersChanged;
  }

  render() {
    const {
      id,
      locations,
      postcode,
      isVisible
    } = this.props;

    if (!isVisible) {
      return <span />;
    }

    if (!isEmpty(locations) && !isEmpty(postcode)) {
      this.locationsMap = new CollectionGoogleMapRenderer(this.props);
    }

    return (
      <div id={id} className="collection-map__map map-container" />
    );
  }
}

CollectionGoogleMap.propTypes = {
  activeMapLocation: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  locations: PropTypes.array.isRequired,
  postcode: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  includeRlc: PropTypes.bool.isRequired,
  includeDts: PropTypes.bool.isRequired
};
