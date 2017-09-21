import React, { PropTypes } from 'react';
import { SelectablePanel } from '../panels/panels';

export default function CollectionLocation(props) {
  const {
    handleLocationClick,
    location,
    name,
    className,
    ...inputProps
  } = props;

  const {
    addressLine1,
    uid
  } = location;

  if (uid === '') {
    return null;
  }

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
        <p className="collection-panel__address">{ addressLine1 }</p>
        <p>TODO - opening hours</p>
      </div>
    </SelectablePanel>
  );
}

CollectionLocation.propTypes = {
  handleLocationClick: PropTypes.func.isRequired,
  location: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    addressLine1: PropTypes.string,
    deliveryMode: PropTypes.shape({
      leadTime: PropTypes.string.isRequired
    })
  }).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};
