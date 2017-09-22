import { MAP_STYLE } from './googleMapConstants';

export function getGoogleLatLng({ latitude, longitude }) {
  return new window.google.maps.LatLng(latitude, longitude);
}

export function getGeocode(postcode) {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({
      address: postcode
    }, (response, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        resolve(response[0].geometry.location);
      } else {
        reject(response, status);
      }
    });
  });
}

export function setCenterOnResize(map, latlng) {
  window.google.maps.event.addListenerOnce(map, 'idle', () => {
    window.google.maps.event
      .addListener(map, 'recenter', () => {
        window.google.maps.event.trigger(map, 'resize');
        map.setCenter(latlng);
      });
    window.google.maps.event
      .addDomListener(window, 'resize', () => {
        window.google.maps.event.trigger(map, 'recenter');
      });
  });

  return map;
}

export function createResponsiveMap(id, postcode) {
  return getGeocode(postcode).then(latlng => {
    const map = new window.google.maps.Map(document.getElementById(id), {
      zoom: 12,
      zoomControl: true,
      panControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      gestureHandling: 'cooperative',
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      center: latlng
    });

    const mapType = new window.google.maps.StyledMapType(MAP_STYLE, {
      name: 'Grayscale'
    });
    map.mapTypes.set('grey', mapType);
    map.setMapTypeId('grey');

    return setCenterOnResize(map, latlng);
  });
}
