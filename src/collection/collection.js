import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import SeciontHeader from 'src/sectionHeader/sectionHeader';
import Separator from 'src/separator/separator';
import { RLC, DTS } from '../deliveryOptions/deliveryOptionsConstants';
import * as CONST from './collectionConstants';
import * as CollectionActions from './collectionActions';
import * as utils from './collectionUtils';
import PostcodeSearch from './postcodeSearch/collectionPostcodeSearch';
import PostcodeSearchForm from './postcodeSearch/collectionPostcodeSearchForm';
import PostcodeSearchError from './postcodeSearch/collectionPostcodeSearchError';
import FilterBar from './filterBar/collectionFilterBar';
import ResultsFilter from './filterBar/collectionResultsFilter';
import ViewChange from './filterBar/collectionViewChange';
import ViewHolder from './collectionViewHolder';
import GoogleMap from './mapView/collectionGoogleMap';
import CollectionLocationList from './listView/collectionLocationList';
import CollectionLocation from './collectionLocation';
import CollectionResults from './collectionResults';
import ClosestStore from './closestStore/closestStore';

export class Collection extends Component {
  constructor() {
    super();

    this.handlePostcodeSearch = this.handlePostcodeSearch.bind(this);
  }

  handlePostcodeSearch(data) {
    const {
      view,
      setCollectionView,
      setCollectionListPageNumber,
      findCollectionPoint,
      isDTSAvailable
    } = this.props;
    setCollectionView(view || CONST.LIST_VIEW);
    setCollectionListPageNumber(1);
    findCollectionPoint(data, isDTSAvailable);
  }

  render() {
    const {
      name,
      errorMsg,
      locations,
      view,
      postcode,
      includeDts,
      includeRlc,
      activeMapLocation,
      pageNumber,
      setCollectionView,
      setActiveMapLocation,
      setCollectionListPageNumber,
      findCollectionPoint,
      deliveryDateRLC,
      deliveryDateDTS,
      isDTSAvailable,
      isRLCAvailable,
      closestStore,
      hasMoreThanOneItem,
      isLoading,
      hasMoreThanOneItemWithDifferentDates
    } = this.props;

    return (
      <div>
        <section className="delivery-section">
          <SeciontHeader icon="delivery-address" title="Where would you like to collect?" />
          <PostcodeSearch>
            <PostcodeSearchForm
              isRLCAvailable={ isRLCAvailable }
              isDTSAvailable={ isDTSAvailable }
              name={ name }
              handleResults={ this.handlePostcodeSearch }
              isLoading={ isLoading }
            />
            <PostcodeSearchError msg={ errorMsg } />
          </PostcodeSearch>
        </section>
        <CollectionResults hasResults={ !isEmpty(locations) }>
          <Separator spacing="top, bottom" className="checkout-section" />
          <ClosestStore
            isDTSAvailable={ isDTSAvailable }
            location={ closestStore }
            deliveryDateRLC={ deliveryDateRLC }
            deliveryDateDTS={ deliveryDateDTS }
            handleLocationClick={ setActiveMapLocation }
            activeLocation={ activeMapLocation }
            hasMoreThanOneItemWithDifferentDates={ hasMoreThanOneItemWithDifferentDates }
          />
          <SeciontHeader icon="delivery-address" title={`Nearest Collection points to '${postcode}'`} />
          <section className="delivery-section">
            <FilterBar hasLocations={ !isEmpty(locations) }>
              <ResultsFilter
                findCollectionPoint={ findCollectionPoint }
                postcode={ postcode }
                includeDts={ includeDts }
                includeRlc={ includeRlc }
                name={ name }
                isDTSAvailable={ isDTSAvailable }
                isRLCAvailable={ isRLCAvailable }
              />
              <ViewChange name={ name } onChange={ setCollectionView } activeType={ view } />
            </FilterBar>
            <ViewHolder type={ CONST.MAP_VIEW } activeType={ view }>
              <GoogleMap
                isVisible={ CONST.MAP_VIEW === view }
                id="collection-map"
                activeMapLocation={ activeMapLocation }
                postcode={ postcode }
                includeDts={ includeDts }
                includeRlc={ includeRlc }
                locations={ locations }
                handleMarkerClick={ setActiveMapLocation }
              />
              <CollectionLocation
                checked
                name="selected-collection"
                className="collection-map__active-location"
                location={ activeMapLocation }
                deliveryDateRLC={ deliveryDateRLC }
                deliveryDateDTS={ deliveryDateDTS }
                deliveryModeCode={ activeMapLocation.type }
                hasMoreThanOneItem={ hasMoreThanOneItem }
              />
            </ViewHolder>
            <ViewHolder type={ CONST.LIST_VIEW } activeType={ view }>
              <CollectionLocationList
                handleLocationClick={ setActiveMapLocation }
                activeLocation={ activeMapLocation }
                pageNumber={ pageNumber }
                locations={ locations }
                handleShowMoreClick={ setCollectionListPageNumber }
                deliveryDateRLC={ deliveryDateRLC }
                deliveryDateDTS={ deliveryDateDTS }
                hasMoreThanOneItemWithDifferentDates={ hasMoreThanOneItemWithDifferentDates }
              />
            </ViewHolder>
          </section>
        </CollectionResults>
      </div>
    );
  }
}

Collection.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  view: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  activeMapLocation: PropTypes.object.isRequired,
  postcode: PropTypes.string.isRequired,
  includeDts: PropTypes.bool.isRequired,
  includeRlc: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  findCollectionPoint: PropTypes.func.isRequired,
  resetCollectionState: PropTypes.func.isRequired,
  setCollectionView: PropTypes.func.isRequired,
  setActiveMapLocation: PropTypes.func.isRequired,
  setCollectionListPageNumber: PropTypes.func.isRequired,
  deliveryDateRLC: PropTypes.string.isRequired,
  deliveryDateDTS: PropTypes.string.isRequired,
  isRLCAvailable: PropTypes.bool.isRequired,
  isDTSAvailable: PropTypes.bool.isRequired,
  closestStore: PropTypes.object.isRequired,
  hasMoreThanOneItem: PropTypes.bool.isRequired,
  hasMoreThanOneItemWithDifferentDates: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const itemDeliveryDates = state.CartData.cartEntries[0].deliveryDate;

  return {
    ...state.Collection,
    deliveryDateRLC: utils.getDeliveryDateByType(RLC, itemDeliveryDates),
    deliveryDateDTS: utils.getDeliveryDateByType(DTS, itemDeliveryDates),
    isRLCAvailable: state.DeliveryOptions.isRLCAvailable,
    isDTSAvailable: state.DeliveryOptions.isDTSAvailable,
    hasMoreThanOneItem: state.CartData.cartEntries.length > 1,
    hasMoreThanOneItemWithDifferentDates: state.CartData.cartEntries.length > 1 && !utils.isMultipleItemsWithSameDates(state.CartData.cartEntries, 'DTS')
  };
}

export default connect(mapStateToProps, CollectionActions)(Collection);
