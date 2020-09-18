import React from 'react';
import PropTypes from 'prop-types';

const CalendarHeader = ({ heading1, heading2 }) => {
  return (
    heading1 &&
    heading2 && (
      <div className="calendar-header">
        <span className="calendar-header__heading calendar-header__heading_main">
          {heading1}
        </span>
        <span className="calendar-header__heading calendar-header__heading_secondary">
          {heading2}
        </span>
      </div>
    )
  );
};

CalendarHeader.propTypes = {
  heading1: PropTypes.string.isRequired,
  heading2: PropTypes.string.isRequired,
};

export default CalendarHeader;
