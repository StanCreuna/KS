import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';

const Calendar = ({ heading, monthList, monthDefault }) => {
  return (
    <div className="calendar">
      <CalendarHeader heading={heading} />
      {monthList &&
        monthList.map((month, index) => {
          return (
            <CalendarMonth
              key={index}
              id={index}
              {...month}
              {...monthDefault}
            />
          );
        })}
    </div>
  );
};

Calendar.propTypes = {
  heading: PropTypes.string.isRequired,
  monthList: PropTypes.arrayOf(PropTypes.exact(CalendarMonth.propTypes)),
  monthDefault: PropTypes.shape({
    inactiveLabel: PropTypes.string.isRequired,
    additionalInfoDownloadsLabel: PropTypes.string.isRequired,
    additionalInfoLinksLabel: PropTypes.string.isRequired,
    attentionImage: PropTypes.string.isRequired,
    fileImage: PropTypes.string.isRequired,
    dropdownImage: PropTypes.string.isRequired,
    monthInfoImage: PropTypes.string.isRequired,
    monthFilesImage: PropTypes.string.isRequired,
    monthInactiveImage: PropTypes.string.isRequired,
    externalLinkImage: PropTypes.string.isRequired,
    downloadLinkImage: PropTypes.string.isRequired,
  }),
};

export default Calendar;
