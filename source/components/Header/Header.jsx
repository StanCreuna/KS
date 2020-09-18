import React from 'react';
import HeaderMenu from 'components/HeaderMenu';
import PropTypes from 'prop-types';
import Logo from 'components/Logo';

const Header = ({ mainNavigation, logo }) => {
  return (
    <div className="header">
      <div className="header__logo">
        <Logo className="logo_main" {...logo} />
      </div>
      <HeaderMenu {...mainNavigation}></HeaderMenu>
    </div>
  );
};

Header.propTypes = {
  mainNavigation: PropTypes.exact(HeaderMenu.propTypes),
  logo: PropTypes.exact(Logo.propTypes),
};

export default Header;
