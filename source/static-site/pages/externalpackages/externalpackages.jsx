/*
group: Pages
name: Externalpackages
*/

import React from 'react';
import Layout from '../../layout.jsx';
import content from './externalpackages.js';
import ExternalPackagesPage from 'components/ExternalPackagesPage';

const Externalpackages = () => (
  <Layout>
    <ExternalPackagesPage {...content} />
  </Layout>
);

export default Externalpackages;
