import * as CONST from './googleMapConstants';
import * as utils from './googleMapUtils';

/*
  location: shape({
    id: number | isRequired,
    geoPoint: {
      latitude: float | isRequired,
      longitude: float | isRequired
    }
  })
*/
export default class GoogleMapMarkers {
  constructor(map, zoomNumberForSmallIcons, zoomNumberForXLargeIcons) {
    this.map = map;
    this.zoomNumberForSmallIcons = zoomNumberForSmallIcons;
    this.zoomNumberForXLargeIcons = zoomNumberForXLargeIcons;
  }

  setMarkers(locations, activeMapLocation, handleMarkerClick) {
    this.markers = this.getSetMarkers(locations, activeMapLocation, handleMarkerClick);
  }

  getMarkers() {
    return this.markers;
  }

  getSetMarkers(locations, activeMapLocation, handleMarkerClick) {
    return locations.map((location, index) => {
      const marker = this.getSetMarker(
        utils.getGoogleLatLng({
          latitude: location.latitude,
          longitude: location.longitude
        }),
        this.getMarkerURL(location, activeMapLocation)
      );

      marker.addListener('click', () => handleMarkerClick(location));
      marker.set('uid', location.uid);
      marker.set('labelIndex', index);
      marker.set('active', location.uid === activeMapLocation.uid);
      return marker;
    });
  }

  getSetMarker(latlng, imageUrl) {
    return new window.google.maps.Marker({
      map: this.map,
      position: latlng,
      icon: imageUrl
    });
  }

  getActiveMarker() {
    return this.markers.filter(marker => marker.active)[0];
  }

  isSmallMarkers() {
    return this.map.getZoom() < this.zoomNumberForSmallIcons;
  }

  isXLargeMarkers() {
    return this.map.getZoom() > this.zoomNumberForXLargeIcons;
  }

  getMarkerLabel(marker) {
    const label = String.fromCharCode('A'.charCodeAt(0) + marker.get('labelIndex'));

    return this.isSmallMarkers() ? {
      text: label,
      color: '#FFFFFF'
    } : '';
  }

  getMarkerURL(current, active = {}) {
    let size = 'LARGE';
    if (this.isSmallMarkers()) {
      size = 'SMALL';
    }

    if (this.isXLargeMarkers()) {
      size = 'XLARGE';
    }

    const markerKey = `GOOGLE_PIN_${size}`;
    const markerActiveKey = `${markerKey}_ACTIVE`;

    if (!active || !current) {
      debugger;
    }

    return current.uid === active.uid
      ? CONST[markerActiveKey]
      : CONST[markerKey];
  }

  setMarkersIconAndLabel(markers = [], activeMarker = {}) {
    markers.forEach(marker => {
      if (!marker) {
        return;
      }

      marker.setIcon(this.getMarkerURL(marker, activeMarker));
      // marker.setLabel(this.getMarkerLabel(marker));
      marker.set('active', marker.uid === activeMarker.uid);
    });
  }

  setCurrentLocationMarker(postcode, imageURL = CONST.GOOGLE_PIN_POSTCODE) {
    utils.getGeocode(postcode).then(latlng => this.getSetMarker(
      latlng,
      imageURL
    ));
  }

  toggleActiveMarker(activeMapLocation = {}) {
    const currentActiveMarker = this.getActiveMarker();
    const nextActiveMarker = this.getMarkers().filter(
      marker => marker.uid === activeMapLocation.uid
    )[0];

    this.setMarkersIconAndLabel(
      [currentActiveMarker, nextActiveMarker],
      nextActiveMarker
    );
  }

  changeMarkersOnZoom() {
    this.map.addListener('zoom_changed',
      () => this.setMarkersIconAndLabel(this.getMarkers(), this.getActiveMarker())
    );
  }
}
