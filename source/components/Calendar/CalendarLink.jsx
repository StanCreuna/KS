import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const CalendarLink = ({
  openInNewTab,
  download,
  url,
  text,
  className,
  tabindex,
  children,
}) => {
  return url ? (
    <a
      href={url}
      className={cn('calendar-link', {
        [className]: className,
      })}
      target={openInNewTab ? '_blank' : null}
      tabIndex={tabindex}
      download={download}
    >
      {text}
      {children}
    </a>
  ) : (
    <Fragment>
      {text}
      {children}
    </Fragment>
  );
};

CalendarLink.propTypes = {
  openInNewTab: PropTypes.bool,
  download: PropTypes.bool,
  url: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  tabindex: PropTypes.number,
  children: PropTypes.node,
};

CalendarLink.propTypesMeta = {
  className: 'exclude',
  tabindex: 'exclude',
  children: 'exclude',
};

export default CalendarLink;
