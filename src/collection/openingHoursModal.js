import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import Modal from 'src/modals/modal';
import Icon from 'src/icons/icon';

export default class OpeningHoursModal extends Component {
  constructor() {
    super();
    this.state = {
      isShowing: false
    };

    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.getStoreOpening = this.getStoreOpening.bind(this);
  }

  getStoreOpening(day) {
    const {
      closed,
      openingTime,
      closingTime
    } = day;

    if (closed) {
      return <span>Closed</span>;
    }

    return (
      <span>
        {openingTime.formattedHour} - {closingTime.formattedHour}
      </span>
    );
  }

  handleModalToggle() {
    this.setState({
      isShowing: !this.state.isShowing
    });

    $('html').toggleClass('_is-modal-showing', !this.state.isShowing);
    $('.form-input__input', '.collection-search').blur();
  }

  render() {
    const {
      name,
      phone,
      email,
      weekDayOpeningList,
      geoPoint
    } = this.props;
    const {
      latitude,
      longitude
    } = geoPoint;

    // TODO: BBDEV-3602 need to swap URL once we go to prod
    let markerUrl = 'https://lh3.googleusercontent.com/LhsWKZSMdQkI05KVImU3cpvq2rHtY6igAVTbTS4nv_vgsezYoWH9SN9eFAK34GtM4GTTRLacV6e5DDcVQw5L0z-dvaWbfnUAY4f8p_kE5mHln3sJ6FDaazX0AJKAVAiXeeZSNLtLRoZV_m9wTIY4rj0DQdSu0_kftoR-jV5DKHjgQevXJJ3Pd2O-17bmpBxMVqv7g7KZP26fvh2UEOJ1KBMbVAx752HtVJ7GxNUu7x0ZOUaxissFsGGvOTqwGYpf0tj-zhAlpB_3mYpv-Ua2omhDaWKh2NHpObnSa0h_WOCabTwUlyOhlK-N4h5nDcscXSqrfUkd50hih88tERf7judI8hWe0WTR9zFUBiYFv5loTny_eTlSbIVH1lSKF2V5y0T5Uv1dy1lE-BQoLFxBRjuvUFXk-wJudY6omqyfgmDQS8HFTfEtaGiELrxr21eJ9zyYwpMQ4YjUVrjE4K9fz_2dlM96UnK5oI4jSOSlxoolMkN1-Tea3_0EE5UxrHMw-yDHlVDqDNfJ78lZ2p99hCm528IbwUv2VV8r9D9v91r8MJqmkvIo9M4PkmQ-zojtajh6uoMYpGePtT6Xe-WoAgm3GqZTG3dXw8yqQaSP4sHohSA=w38-h58-no';
    if (window.BB.common.environment === 'production') {
      markerUrl = 'https://beaverbrooks.co.uk/_ui/desktop/common/images/maps/pin.png';
    }

    return (
      <div>
        <button
          onClick={this.handleModalToggle}
          className="collection-panel__store-link button button--tertiary"
        >
          Open store details
        </button>
        <Modal
          isShowing={this.state.isShowing}
          handleToggle={this.handleModalToggle}
          modifier="green"
        >
          <div className="store-info">
            <div className="store-info__holder">
              <h2 className="store-info__title">{name} Store</h2>
              <div className="row row--stretch">
                <div className="columns medium-5 store-info__times">
                  <table>
                    <tbody>
                      {
                        weekDayOpeningList.map(day => (
                          <tr key={`opening${day.weekDay}`}>
                            <th>{day.weekDay}</th>
                            <td>{ this.getStoreOpening(day) }</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className="columns medium-7 store-info__map">
                  <img src={`https://maps.googleapis.com/maps/api/staticmap?size=300x200&maptype=roadmap&markers=icon:${markerUrl}|${latitude},${longitude}&center=${latitude},${longitude}`} />
                </div>
              </div>
            </div>
            <div className="store-info__footer">
              <div className="row">
                <div className="columns small-6 medium-4">
                  <a href={`tel:${phone}`} className="store-info__tel">
                    <Icon name="phone" />
                    <div className="store-info__tel-txt">
                      {phone}
                    </div>
                  </a>
                </div>
                <div className="columns small-6 medium-8">
                  <a className="store-info__mail" href={`mailto:${email}`} target="_blank">
                    <Icon name="email" />
                    <span className="store-info__mail-txt">{email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

OpeningHoursModal.propTypes = {
  name: PropTypes.string.isRequired,
  weekDayOpeningList: PropTypes.arrayOf(PropTypes.object).isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  geoPoint: PropTypes.object.isRequired
};
