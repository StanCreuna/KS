import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Link = ({ openInNewTab, url, text, className, tabindex, children }) => {
  return url ? (
    <a
      href={url}
      className={cn('link', {
        [className]: className,
      })}
      target={openInNewTab ? '_blank' : null}
      title={children ? text : undefined}
      tabIndex={tabindex}
    >
      {!children && text}
      {children}
    </a>
  ) : (
    <Fragment>
      {!children && text}
      {children}
    </Fragment>
  );
};

Link.propTypes = {
  openInNewTab: PropTypes.bool,
  url: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  tabindex: PropTypes.number,
  children: PropTypes.node,
};

Link.propTypesMeta = {
  className: 'exclude',
  tabindex: 'exclude',
  children: 'exclude',
};

export default Link;
