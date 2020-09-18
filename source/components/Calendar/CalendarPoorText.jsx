import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const CalendarPoorText = ({ className, text }) =>
  React.createElement('div', {
    className: cn('calendar-poor-text', className),
    dangerouslySetInnerHTML: { __html: text },
  });

CalendarPoorText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

CalendarPoorText.propTypesMeta = 'exclude';

export default CalendarPoorText;
