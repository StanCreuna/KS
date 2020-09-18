import PropTypes from 'prop-types';
import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import headerData from './data/header.json';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header {...headerData} />
      <main className="content" id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
