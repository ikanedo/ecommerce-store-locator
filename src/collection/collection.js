import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CONST from './collectionConstants';
import * as CollectionActions from './collectionActions';
import PostcodeSearch from './postcodeSearch/collectionPostcodeSearch';
import PostcodeSearchForm from './postcodeSearch/collectionPostcodeSearchForm';
import PostcodeSearchError from './postcodeSearch/collectionPostcodeSearchError';
import FilterBar from './filterBar/collectionFilterBar';
import ViewChange from './filterBar/collectionViewChange';
import ViewHolder from './collectionViewHolder';
import GoogleMap from './mapView/collectionGoogleMap';
import CollectionLocationList from './listView/collectionLocationList';
import CollectionLocation from './collectionLocation';
import CollectionResults from './collectionResults';

export class Collection extends Component {
  constructor() {
    super();
    this.handlePostcodeSearch = this.handlePostcodeSearch.bind(this);
    this.handleCollectFromLocation = this.handleCollectFromLocation.bind(this);
    this.handleChangeStore = this.handleChangeStore.bind(this);
  }

  handlePostcodeSearch(geolocation) {
    const {
      view,
      setCollectionView,
      findCollectionPoint,
      endpointUrl,
      endpointParams
    } = this.props;
    setCollectionView(view || CONST.LIST_VIEW);
    findCollectionPoint(endpointUrl, endpointParams, geolocation);
  }

  handleCollectFromLocation() {
    const {
      activeMapLocation,
      setSelectedStore
    } = this.props;

    setSelectedStore(activeMapLocation);
  }

  handleChangeStore() {
    this.props.setChangeStore(true);
  }

  render() {
    const {
      name,
      errorMsg,
      locations,
      view,
      postcode,
      activeMapLocation,
      setCollectionView,
      setActiveMapLocation,
      isLoading,
      isChangeStore
    } = this.props;

    const hasLocations = locations.length > 0;

    return (
      <div className="collection-app">
        <PostcodeSearch
          postcode={postcode}
          hasLocations={hasLocations}
          locations={locations}
          handleChangeStore={this.handleChangeStore}
          isChangeStore={isChangeStore}
        >
          <PostcodeSearchForm
            name={name}
            handleResults={this.handlePostcodeSearch}
            isLoading={isLoading}
          />
          <PostcodeSearchError msg={errorMsg} />
        </PostcodeSearch>
        <CollectionResults hasResults={hasLocations}>
          <ViewHolder type={CONST.MAP_VIEW} activeType={view}>
            <GoogleMap
              isVisible={CONST.MAP_VIEW === view}
              id="collection-map"
              activeMapLocation={activeMapLocation}
              postcode={postcode}
              locations={locations}
              handleMarkerClick={setActiveMapLocation}
            />
            <CollectionLocation
              checked
              name="selected-collection"
              className="collection-map__active-location"
              location={activeMapLocation}
              handleLocationClick={setActiveMapLocation}
            />
          </ViewHolder>
          <ViewHolder type={CONST.LIST_VIEW} activeType={view}>
            <CollectionLocationList
              handleLocationClick={setActiveMapLocation}
              activeLocation={activeMapLocation}
              locations={locations}
            />
          </ViewHolder>
          <FilterBar hasLocations={hasLocations}>
            <button disabled={activeMapLocation.uid === ''} onClick={this.handleCollectFromLocation} className="button collection-filter__primary">Select store</button>
            <ViewChange name={name} onChange={setCollectionView} activeType={view} />
          </FilterBar>
        </CollectionResults>
      </div>
    );
  }
}

Collection.propTypes = {
  endpointUrl: PropTypes.string,
  endpointParams: PropTypes.object,
  view: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  activeMapLocation: PropTypes.object.isRequired,
  postcode: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  findCollectionPoint: PropTypes.func.isRequired,
  setCollectionView: PropTypes.func.isRequired,
  setActiveMapLocation: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSelectedStore: PropTypes.func.isRequired,
  setChangeStore: PropTypes.func.isRequired,
  isChangeStore: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    ...state.Collection
  };
}

export default connect(mapStateToProps, CollectionActions)(Collection);
