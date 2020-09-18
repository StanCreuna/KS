import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Link from 'components/Link';

const HeaderMenuLink = ({ link, isActive }) => {
  return (
    <Link {...link} className={cn('header-menu__link', { active: isActive })} />
  );
};

HeaderMenuLink.propTypes = {
  isActive: PropTypes.bool,
  link: PropTypes.exact(Link.propTypes),
};

export default HeaderMenuLink;
