import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import * as utils from '../../googleMaps/googleMapUtils';
import GoogleMapMarkers from '../../googleMaps/googleMapMarkers';

export class CollectionGoogleMapRenderer {
  constructor({ id, postcode, locations, activeMapLocation, handleMarkerClick }) {
    return utils.createResponsiveMap(id, postcode).then(map => {
      this.map = map;
      this.markers = new GoogleMapMarkers(map, 12, 13);
      this.markers.setMarkers(
        locations,
        activeMapLocation,
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
      (activeMapLocation.uid !== nextProps.activeMapLocation.uid);
    const isAlreadyInitialised =
      this.locationsMap && nextProps.activeMapLocation.uid;
    const hasSwitchedFromListToMap =
      isAlreadyInitialised && !isVisible && nextProps.isVisible;

    if (this.hasSearchChanged(nextProps)) {
      this.locationsMap = undefined;
    }

    if (hasSwitchedFromListToMap) {
      this.locationsMap.then(({ map }) => {
        window.google.maps.event.trigger(map, 'recenter');
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
      postcode
    } = this.props;

    const hasPostcodeChanged = postcode !== nextProps.postcode;

    return hasPostcodeChanged;
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
    name: PropTypes.string.isRequired,
    uid: PropTypes.string,
    distance: PropTypes.number
  }),
  locations: PropTypes.array.isRequired,
  postcode: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired
};
