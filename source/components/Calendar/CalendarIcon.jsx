import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import cn from 'classnames';
import urlHelper from './js/url-helper';
import CalendarImage from './CalendarImage';

const CalendarIcon = ({ className, url }) => {
  const isSVG = urlHelper.getFileExtension(url) === 'svg' ? true : false;

  // ReactSVG creates structure span > span > svg
  // Image creates structure span > img
  // in both cases we can't set class on svg directly
  // created common structure for all cases
  // span class="calendar-icon" > span > (svg/img)

  return (
    <Fragment>
      {url &&
        (isSVG ? (
          <ReactSVG
            src={url}
            className={cn('calendar-icon', className)}
            wrapper="span"
          />
        ) : (
          <span className={cn('calendar-icon', className)}>
            <CalendarImage src={url} />
          </span>
        ))}
    </Fragment>
  );
};

CalendarIcon.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
};

CalendarIcon.propTypesMeta = 'exclude';

export default CalendarIcon;
