import $ from 'jquery';
import isEmpty from 'lodash/isEmpty';
import * as CONST from './collectionConstants';
import { setDeliveryMethod, setDeliveryMethodSelectionTracking } from '../deliveryOptions/deliveryOptionsActions';
import { setDeliveryAddress } from '../deliveryAddress/deliveryAddressActions';
import { setBillingAddress } from '../billingAddress/billingAddressActions';

export function setCollectionListPageNumber(pageNumber) {
  return {
    type: CONST.SET_COLLECTION_LIST_PAGE_NUMBER,
    pageNumber
  };
}

export function setCollectionView(view) {
  return {
    type: CONST.SET_COLLECTION_VIEW,
    view
  };
}

export function resetCollectionState() {
  return {
    type: CONST.RESET_COLLECTION
  };
}

export function setActiveMapLocation(location, deliveryModeCode, isNonInteraction = false) {
  return dispatch => {
    dispatch({
      type: CONST.SET_ACTIVE_MAP_LOCATION,
      location
    });

    dispatch(setDeliveryMethodSelectionTracking(location.type, isNonInteraction));

    if (location.type !== deliveryModeCode) {
      dispatch(setDeliveryMethod({
        code: location.type
      }));
    }
  };
}

export function setCollectionLoading(isLoading) {
  return {
    type: CONST.SET_COLLECTION_LOADING,
    isLoading
  };
}

export function setCollectionLocations(locations) {
  return {
    type: CONST.SET_COLLECTION_LOCATIONS,
    locations
  };
}

export function setCollectionFilters(postcodeObj) {
  return {
    type: CONST.SET_COLLECTION_FILTERS,
    ...postcodeObj
  };
}

export function setClosestStore(closestStore) {
  return {
    type: CONST.SET_CLOSEST_STORE,
    closestStore
  };
}

export function setCollectionErrorMsg(errorMsg) {
  return {
    type: CONST.SET_COLLECTION_ERROR_MSG,
    errorMsg
  };
}

export function scrollToResults() {
  return () => {
    const $results = $('#collection-results');
    if ($results.length > 0) {
      $('html, body').stop().animate({
        scrollTop: $results.offset().top - 20
      }, 'slow');
    }
  };
}

export function findCollectionPoint(postcodeObj, isDTSAvailable) {
  return dispatch => {
    dispatch(setCollectionLoading(true));
    $.get(CONST.COLLECT_FIND_URL, postcodeObj)
      .then(response => {
        dispatch(setBillingAddress(undefined, undefined));
        dispatch(setDeliveryAddress(undefined, undefined));
        return response;
      })
      .then(response => {
        if (response.geoPoint === null) {
          dispatch(resetCollectionState());
          dispatch(setCollectionErrorMsg('Something went wrong. Please check your postcode and try again.'));
          return response;
        }

        if (isEmpty(response.locations)) {
          dispatch(resetCollectionState());
          dispatch(setCollectionErrorMsg('No collection locations found close to your postcode.'));
          return response;
        }

        dispatch(setCollectionLocations(response.locations));
        dispatch(setCollectionFilters(postcodeObj));

        const hasClosestStore = response.closestStore !== null && response.closestLocationId !== null;
        if (isDTSAvailable && hasClosestStore) {
          dispatch(setActiveMapLocation(response.closestStore, response.closestStore.type, true));
          dispatch(setClosestStore(response.closestStore));
        } else {
          dispatch(setActiveMapLocation(response.locations[0], response.locations[0].type, true));
        }

        return response;
      })
      .fail((response) => {
        dispatch(setCollectionLoading(false));
        dispatch(resetCollectionState());
        if (response.hasOwnProperty('message')) {
          dispatch(setCollectionErrorMsg(response.message));
        } else {
          dispatch(setCollectionErrorMsg('Something went wrong. Please check your postcode and try again.'));
        }
      })
      .then(() => dispatch(setCollectionLoading(false)))
      .then(() => dispatch(scrollToResults()));
  };
}
