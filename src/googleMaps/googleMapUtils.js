import google from 'google';
import mediaQuery from 'src/utils/mediaQuery';

export function getGoogleLatLng({ latitude, longitude }) {
  return new google.maps.LatLng(latitude, longitude);
}

export function getGeocode(postcode) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: postcode
    }, (response, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(response[0].geometry.location);
      } else {
        reject(response, status);
      }
    });
  });
}

export function setCenterOnResize(map, latlng) {
  google.maps.event.addListenerOnce(map, 'idle', () => {
    google.maps.event
      .addListener(map, 'recenter', () => {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(latlng);
      });
    google.maps.event
      .addDomListener(window, 'resize', () => {
        google.maps.event.trigger(map, 'recenter');
      });
  });

  return map;
}

export function isTouchAndSmall() {
  return ('ontouchstart' in document.documentElement) && mediaQuery.current === 'small';
}

export function createResponsiveMap(id, postcode) {
  return getGeocode(postcode).then(latlng => {
    const map = new google.maps.Map(document.getElementById(id), {
      zoom: 12,
      zoomControl: true,
      panControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      gestureHandling: 'cooperative',
      // draggable: !isTouchAndSmall(),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: latlng
    });

    return setCenterOnResize(map, latlng);
  });
}
