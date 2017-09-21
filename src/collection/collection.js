import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
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
      isLoading
    } = this.props;

    return (
      <div>
        <section className="delivery-section">
          <PostcodeSearch>
            <PostcodeSearchForm
              name={ name }
              handleResults={ this.handlePostcodeSearch }
              isLoading={ isLoading }
            />
            <PostcodeSearchError msg={ errorMsg } />
          </PostcodeSearch>
        </section>
        <CollectionResults hasResults={ !isEmpty(locations) }>
          <section className="delivery-section">
            <FilterBar hasLocations={ !isEmpty(locations) }>
              <ViewChange name={ name } onChange={ setCollectionView } activeType={ view } />
            </FilterBar>
            <ViewHolder type={ CONST.MAP_VIEW } activeType={ view }>
              <GoogleMap
                isVisible={ CONST.MAP_VIEW === view }
                id="collection-map"
                activeMapLocation={ activeMapLocation }
                postcode={ postcode }
                locations={ locations }
                handleMarkerClick={ setActiveMapLocation }
              />
              <CollectionLocation
                checked
                name="selected-collection"
                className="collection-map__active-location"
                location={ activeMapLocation }
                handleLocationClick={ setActiveMapLocation }
              />
            </ViewHolder>
            <ViewHolder type={ CONST.LIST_VIEW } activeType={ view }>
              <CollectionLocationList
                handleLocationClick={ setActiveMapLocation }
                activeLocation={ activeMapLocation }
                locations={ locations }
              />
            </ViewHolder>
          </section>
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
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    ...state.Collection
  };
}

export default connect(mapStateToProps, CollectionActions)(Collection);
