import * as CONST from './collectionConstants';

const initialState = {
  endpointUrl: '',
  endpointParams: {},
  view: CONST.LIST_VIEW,
  errorMsg: undefined,
  locations: [],
  isLoading: false,
  isChangeStore: false,
  postcode: '',
  activeMapLocation: {
    uid: '',
    name: '',
    addressLine1: '',
    latitude: 0,
    longitude: 0
  },
  selectedStore: null
};

export default function collection(state = initialState, action) {
  switch (action.type) {
    case CONST.SET_CHANGE_STORE:
      return {
        ...state,
        isChangeStore: action.isChangeStore
      };
    case CONST.SET_SELECTED_STORE:
      return {
        ...initialState,
        selectedStore: action.selectedStore
      };
    case CONST.SET_COLLECTION_CONFIG:
      return {
        ...state,
        endpointUrl: action.endpointUrl,
        endpointParams: action.endpointParams
      };
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
