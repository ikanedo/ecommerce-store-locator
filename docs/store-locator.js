import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loadGoogleMapsAPI from 'load-google-maps-api';
import { FormReducer as Forms } from 'react-redux-simple-validate';
import CollectionApp from '../src/collection/collection';
import Collection from '../src/collection/collectionReducer';

import './store-locator.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    Collection,
    Forms
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default class StoreLocator extends Component {
  constructor() {
    super();
    this.state = {
      isGoogleApiLoaded: false
    };
  }


  componentWillMount() {
    // AIzaSyCVkF6QYNct5MP7vLiQMb4Ug7-se9_OpHc
    loadGoogleMapsAPI({
      key: 'AIzaSyA3ffj9TQGBB-vWlDL7shEe5cS7qa9NJ84'
    }).then(() => {
      this.setState({
        isGoogleApiLoaded: true
      });
    });

    store.dispatch({
      type: 'SET_COLLECTION_CONFIG',
      endpointUrl: '/gb/store-locator/stock',
      endpointParams: {
        countryCode: 'GB',
        productCode: 'HH3269-257A100-A100'
      }
    });
  }

  render() {
    if (!this.state.isGoogleApiLoaded) {
      return null;
    }

    return (
      <Provider store={store}>
        <CollectionApp
          name="Collection"
        />
      </Provider>
    );
  }
}
