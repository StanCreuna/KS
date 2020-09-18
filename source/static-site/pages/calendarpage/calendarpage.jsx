/*
group: Pages
name: Calendarpage
*/

import React from 'react';
import Layout from '../../layout.jsx';
import content from './calendarpage.js';
import CalendarPage from 'components/CalendarPage';

const Calendarpage = () => (
  <Layout>
    <CalendarPage {...content} />
  </Layout>
);

export default Calendarpage;
