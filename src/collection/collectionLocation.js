import React, { PropTypes } from 'react';
import { SelectablePanel } from '../panels/panels';

export default function CollectionLocation(props) {
  const {
    handleLocationClick,
    location,
    name,
    className,
    deliveryModeCode,
    ...inputProps
  } = props;

  const {
    address
  } = location;

  return (
    <SelectablePanel
      className={className}
      handleChange={() => handleLocationClick(location)}
      title={ location.name }
      name={ name }
      value={ location.name }
      {...inputProps}
    >
      <div className="collection-panel">
        <p className="collection-panel__address">{ address }</p>
        <p>TODO - opening hours</p>
      </div>
    </SelectablePanel>
  );
}

CollectionLocation.propTypes = {
  handleLocationClick: PropTypes.func.isRequired,
  location: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    geoPoint: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    })
  }).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  deliveryModeCode: PropTypes.string.isRequired
};
