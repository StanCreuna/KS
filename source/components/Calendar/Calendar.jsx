import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';

const Calendar = ({ header, monthList, monthDefault }) => {
  return (
    <div className="calendar">
      <CalendarHeader {...header} />
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
  header: PropTypes.exact(CalendarHeader.propTypes),
  monthList: PropTypes.arrayOf(PropTypes.exact(CalendarMonth.propTypes)),
  monthDefault: PropTypes.shape({
    inactiveLabel: PropTypes.string.isRequired,
    additionalInfoLabel: PropTypes.string.isRequired,
    additionalInfoIsEmptyLabel: PropTypes.string.isRequired,
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
