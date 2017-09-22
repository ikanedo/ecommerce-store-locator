import isEmpty from 'lodash/isEmpty';
import * as CONST from './collectionConstants';
import mock from './mock2';

const ajax = {
  get(url, data) {
    console.log(1, 'mock get request is fired!');
    console.log(2, 'url called', url);
    console.log(3, 'data sent', data);
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

export function setCollectionFilters(geolocation) {
  return {
    type: CONST.SET_COLLECTION_FILTERS,
    postcode: geolocation
  };
}

export function setCollectionErrorMsg(errorMsg) {
  return {
    type: CONST.SET_COLLECTION_ERROR_MSG,
    errorMsg
  };
}

export function setSelectedStore(selectedStore) {
  return {
    type: CONST.SET_SELECTED_STORE,
    selectedStore
  };
}

export function setChangeStore(isChangeStore) {
  return {
    type: CONST.SET_CHANGE_STORE,
    isChangeStore
  };
}

export function findCollectionPoint(url, params, geolocation) {
  return dispatch => {
    dispatch(setCollectionLoading(true));

    ajax.get(url, Object.assign({
      geolocation
    }, params))
      .then(response => {
        if (isEmpty(response.stores)) {
          dispatch(resetCollectionState());
          dispatch(setCollectionErrorMsg('We couldn\'t find stores near you. View all stores with stock or enter another location.'));
          return response;
        }

        dispatch(setCollectionLocations(response.stores));
        dispatch(setCollectionFilters(geolocation));
        dispatch(setChangeStore(false));
        return response;
      }, () => {
        dispatch(setCollectionLoading(false));
        dispatch(resetCollectionState());
        dispatch(setCollectionErrorMsg('Something went wrong. Please check your postcode and try again.'));
      })
      .then(() => dispatch(setCollectionLoading(false)));
  };
}
