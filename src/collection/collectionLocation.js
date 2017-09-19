import React, { Component, PropTypes } from 'react';
import { SelectablePanel } from 'src/panels/panels';
import * as utils from './collectionUtils';
import { DTS } from '../deliveryOptions/deliveryOptionsConstants';
import OpeningHoursModal from './openingHoursModal';

export default class CollectionLocation extends Component {
  constructor() {
    super();
    this.getOpeningHours = this.getOpeningHours.bind(this);
  }

  getOpeningHours() {
    const {
      openingHours,
      phone,
      email,
      name,
      geoPoint
    } = this.props.location;

    if (!openingHours) {
      return null;
    }

    return (
      <OpeningHoursModal
        geoPoint={geoPoint}
        phone={phone}
        email={email}
        name={name}
        weekDayOpeningList={openingHours.weekDayOpeningList}
      />
    );
  }

  render() {
    const {
      handleLocationClick = () => {},
      location,
      name,
      className,
      deliveryDateDTS,
      deliveryDateRLC,
      deliveryModeCode,
      hasMoreThanOneItemWithDifferentDates,
      ...inputProps
    } = this.props;

    const {
      distance,
      address,
      type
    } = location;

    if (distance === null) {
      return <span />;
    }

    const displayDate = utils.getFormattedDate(type === DTS ? deliveryDateDTS : deliveryDateRLC);
    return (
      <SelectablePanel
        className={className}
        handleChange={() => handleLocationClick(location, deliveryModeCode)}
        title={ location.name }
        name={ name }
        value={ location.name }
        rightHeaderIcons={[
          utils.getIcon(type)
        ]}
        {...inputProps}
      >
        <div className="collection-panel">
          <p className="collection-panel__distance">{ distance.toFixed(1) } miles away</p>
          <p className="collection-panel__address">{ address }</p>
          <p className="collection-panel__date">
            Collect your order from { displayDate }.
            { hasMoreThanOneItemWithDifferentDates ? ' Some items may follow later.' : ''}
          </p>
          { this.getOpeningHours() }
        </div>
      </SelectablePanel>
    );
  }
}

CollectionLocation.propTypes = {
  handleLocationClick: PropTypes.func,
  location: PropTypes.shape({
    type: PropTypes.string.isRequired,
    openingHours: PropTypes.object,
    distance: PropTypes.number,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string.isRequired,
    geoPoint: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    })
  }).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  deliveryDateRLC: PropTypes.string.isRequired,
  deliveryDateDTS: PropTypes.string.isRequired,
  hasMoreThanOneItemWithDifferentDates: PropTypes.bool.isRequired,
  deliveryModeCode: PropTypes.string.isRequired
};
