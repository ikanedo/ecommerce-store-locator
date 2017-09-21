import isEmpty from 'lodash/isEmpty';
import * as CONST from './collectionConstants';
import mock from './mock2';

const ajax = {
  get() {
    return Promise.resolve(mock);
  }
};

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

export function setActiveMapLocation(location) {
  return dispatch => {
    dispatch({
      type: CONST.SET_ACTIVE_MAP_LOCATION,
      location
    });
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

export function setCollectionErrorMsg(errorMsg) {
  return {
    type: CONST.SET_COLLECTION_ERROR_MSG,
    errorMsg
  };
}

export function findCollectionPoint(postcodeObj) {
  return dispatch => {
    dispatch(setCollectionLoading(true));
    ajax.get(CONST.COLLECT_FIND_URL, postcodeObj)
      .then(response => {
        if (isEmpty(response.stores)) {
          dispatch(resetCollectionState());
          dispatch(setCollectionErrorMsg('No collection locations found close to your postcode.'));
          return response;
        }

        dispatch(setCollectionLocations(response.stores));
        dispatch(setCollectionFilters(postcodeObj));
        return response;
      }, () => {
        dispatch(setCollectionLoading(false));
        dispatch(resetCollectionState());
        dispatch(setCollectionErrorMsg('Something went wrong. Please check your postcode and try again.'));
      })
      .then(() => dispatch(setCollectionLoading(false)));
  };
}
