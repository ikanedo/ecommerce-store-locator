import * as CONST from './collectionConstants';

const initialState = {
  view: CONST.LIST_VIEW,
  errorMsg: undefined,
  locations: [],
  closestStore: {},
  isLoading: false,
  postcode: '',
  activeMapLocation: {
    distance: null,
    name: '',
    type: '',
    address: '',
    geoPoint: {
      latitude: 0,
      longitude: 0
    }
  }
};

export default function collection(state = initialState, action) {
  switch (action.type) {
    case CONST.SET_COLLECTION_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case CONST.SET_COLLECTION_FILTERS:
      return {
        ...state,
        postcode: action.postcode
      };
    case CONST.SET_COLLECTION_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
        errorMsg: undefined
      };
    case CONST.SET_CLOSEST_STORE:
      return {
        ...state,
        closestStore: action.closestStore
      };
    case CONST.SET_ACTIVE_MAP_LOCATION:
      return {
        ...state,
        activeMapLocation: {
          ...action.location
        }
      };
    case CONST.SET_COLLECTION_ERROR_MSG:
      return {
        ...initialState,
        errorMsg: action.errorMsg
      };
    case CONST.SET_COLLECTION_VIEW:
      return {
        ...state,
        view: action.view
      };
    case CONST.RESET_COLLECTION:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
