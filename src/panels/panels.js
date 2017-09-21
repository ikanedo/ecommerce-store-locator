import React, { PropTypes } from 'react';
import FormRadio from '../formsCustom/formRadio';

export function Panel({ children, className }) {
  return (
    <div className={`panel ${className || ''}`}>{ children }</div>
  );
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export function SelectablePanel(props) {
  const {
    title,
    rightHeaderText,
    rightHeaderIcons,
    handleChange,
    children,
    widePanel,
    className,
    isChildrenHidden,
    name,
    ...inputProps
  } = props;

  return (
    <label className={`panel panel--selectable ${className || ''}`}>
      <div className="panel-header">
        <div className="panel-header__l">
          <div className="panel-header__radio">
            <FormRadio onChange={handleChange} {...inputProps} name={name} />
          </div>
          <h2 className="panel-header__title">{ title }</h2>
        </div>
        <div className="panel-header__r">
          { rightHeaderText }
        </div>
      </div>
      <div
        className={
          `panel-content ${widePanel ? 'panel-content--wide' : ''} ${isChildrenHidden ? '_is-hidden' : ''}`
        }
      >
        { children }
      </div>
    </label>
  );
}

SelectablePanel.defaultProps = {
  isChildrenHidden: false
};

SelectablePanel.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  rightHeaderIcons: PropTypes.arrayOf(PropTypes.string),
  rightHeaderText: PropTypes.string,
  widePanel: PropTypes.bool,
  className: PropTypes.string,
  isChildrenHidden: PropTypes.bool
};
