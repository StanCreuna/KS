import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'components/Calendar';
import calendarData from '../../static-site/data/calendar.json';

const CalendarPage = ({ heading, intro }) => {
  return (
    <div className="calendar-page">
      {heading && intro && (
        <div className="calendar-page__heading-container">
          <h1 className="calendar-page__heading">{heading}</h1>
          <span className="calendar-page__heading-intro">{intro}</span>
        </div>
      )}
      <Calendar {...calendarData} />
    </div>
  );
};

CalendarPage.propTypes = {
  heading: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
};

export default CalendarPage;
