import React from 'react';
import PropTypes from 'prop-types';

const CalendarHeader = ({ heading }) => {
  return (
    heading && (
      <div className="calendar-header">
        <span className="calendar-header__heading">{heading}</span>
      </div>
    )
  );
};

CalendarHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default CalendarHeader;
