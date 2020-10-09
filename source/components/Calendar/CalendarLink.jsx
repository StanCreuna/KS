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
      {words.map((word, index) => (
        <span key={index} className="calendar-link__word">
          {word}
          {lastWordIndex === index && children}
        </span>
      ))}
    </a>
  ) : (
    <Fragment>
      {words.map((word, index) => (
        <span key={index} className="calendar-link__word">
          {word}
          {lastWordIndex === index && children}
        </span>
      ))}
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
