import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const CalendarLink = ({
  openInNewTab,
  url,
  text,
  download,
  className,
  tabindex,
  children,
}) => {
  const words = text.split(' ');
  const lastWordIndex = words.length - 1;

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
  url: PropTypes.string,
  text: PropTypes.string,
  download: PropTypes.bool,
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
