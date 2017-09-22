import React from 'react';
import PropTypes from 'prop-types';

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
    telephone,
    postcodeAfter,
    city,
    uid,
    deliveryMode,
    regularOpeningTime
  } = location;

  if (uid === '') {
    return null;
  }

  return (
    <div className={`collection-card ${className || ''}`}>
      <input
        className="collection-card__input"
        type="radio"
        name={name}
        value={location.name}
        onChange={() => handleLocationClick(location)}
        id={uid}
        {...inputProps}
      />
      <label className="collection-card__card" htmlFor={uid}>
        <div className="collection-card__l">
          <div className="collection-card__header">
            <h4 className="collection-card__title">{location.name}</h4>
            <p className="collection-card__address">{addressLine1}, {city}</p>
            <p className="collection-card__address">{postcodeAfter}</p>
            <p className="collection-card__address">{telephone}</p>
          </div>
          <div className="collection-card__content">
            <table className="collection-card__opening">
              <tbody>
                {
                  regularOpeningTime.map(day =>
                    <tr key={day.title.replace(/ /g, '-')}>
                      <td>{day.title}</td>
                      <td>{day.openingHours}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <button className="collection-card__link">Opening hours</button>
          </div>
        </div>
        <div className="collection-card__r">
          <strong>Availability</strong>
          <p className="collection-card__availability">{deliveryMode.leadTime}</p>
        </div>
      </label>
    </div>
  );
}

CollectionLocation.propTypes = {
  handleLocationClick: PropTypes.func.isRequired,
  location: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    addressLine1: PropTypes.string,
    postcodeAfter: PropTypes.string,
    telephone: PropTypes.string,
    deliveryMode: PropTypes.shape({
      leadTime: PropTypes.string.isRequired
    }),
    regularOpeningTime: PropTypes.array
  }).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};
