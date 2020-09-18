import React from 'react';
import PropTypes from 'prop-types';
import HeaderMenuLink from './HeaderMenuLink';

const HeaderMenu = ({ links }) => {
  return (
    <nav className="header-menu">
      {links &&
        links.map((link, index) => (
          <HeaderMenuLink key={index} {...link}></HeaderMenuLink>
        ))}
    </nav>
  );
};

HeaderMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.exact(HeaderMenuLink.propTypes)),
};

export default HeaderMenu;
