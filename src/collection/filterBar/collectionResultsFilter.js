import React, { Component, PropTypes } from 'react';

export default class CollectionResultsFilter extends Component {
  constructor(props) {
    super(props);

    this.toggleDTS = this.toggleDTS.bind(this);
    this.toggleRLC = this.toggleRLC.bind(this);
  }

  toggleDTS(e) {
    const {
      findCollectionPoint,
      postcode,
      includeRlc
    } = this.props;

    if (includeRlc) {
      findCollectionPoint({
        includeRlc,
        postcode,
        includeDts: e.target.checked
      });
    }
  }

  toggleRLC(e) {
    const {
      findCollectionPoint,
      postcode,
      includeDts
    } = this.props;

    if (includeDts) {
      findCollectionPoint({
        includeDts,
        postcode,
        includeRlc: e.target.checked
      });
    }
  }

  render() {
    const {
      includeDts,
      includeRlc,
      isRLCAvailable,
      isDTSAvailable
    } = this.props;

    const hasOneCollectionOption = !isRLCAvailable || !isDTSAvailable;

    return (
      <div className={`collection-filter__holder ${hasOneCollectionOption ? '_is-invisible' : ''}`}>
        <span className="collection-filter__show">Show: </span>
        <ul className="collection-filter__types">
          <li className="collection-filter__input">
            <label className="form-checkbox">
              <input
                className="form-checkbox__input"
                onChange={ this.toggleDTS }
                checked= { includeDts }
                type="checkbox"
                name="includeDts"
                id="includeDts"
              />
              <span className="form-checkbox__radio"></span>
            </label>
            <label className="form-checkbox__label" htmlFor="includeDts">
              Beaverbrooks Stores
            </label>
          </li>
          <li className="collection-filter__input">
            <label className="form-checkbox">
              <input
                className="form-checkbox__input"
                onChange={ this.toggleRLC }
                checked= { includeRlc }
                type="checkbox"
                name="includeRlc"
                id="includeRlc"
              />
              <span className="form-checkbox__radio"></span>
            </label>
            <label className="form-checkbox__label" htmlFor="includeRlc">
              Post Offices
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

CollectionResultsFilter.propTypes = {
  name: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  findCollectionPoint: PropTypes.func.isRequired,
  includeDts: PropTypes.bool.isRequired,
  includeRlc: PropTypes.bool.isRequired,
  isRLCAvailable: PropTypes.bool.isRequired,
  isDTSAvailable: PropTypes.bool.isRequired
};
