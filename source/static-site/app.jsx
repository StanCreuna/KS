/* eslint-disable @creuna/prop-types-csharp/all */
import React from 'react';
import PropTypes from 'prop-types';

const App = ({
  children,
  css = [],
  js = [],
  shouldIncludeWebpackDevServerJs,
  title,
}) => (
  <html lang="en">
    <head>
      {css.map((file, index) => (
        <link key={index} rel="stylesheet" href={`/${file}`} />
      ))}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {shouldIncludeWebpackDevServerJs && (
        <script src="/webpack-dev-server.js" />
      )}
      <title>KS {title}</title>

      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="static-site/assets/favicons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="static-site/assets/favicons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="static-site/assets/favicons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="static-site/assets/favicons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="static-site/assets/favicons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="static-site/assets/favicons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="static-site/assets/favicons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="static-site/assets/favicons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="static-site/assets/favicons/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="static-site/assets/favicons/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="static-site/assets/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="static-site/assets/favicons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="static-site/assets/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="static-site/assets/favicons/manifest.json" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta
        name="msapplication-TileImage"
        content="static-site/assets/favicons/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content="Mockup." />
    </head>
    <body>
      <div id="mount-point">{children}</div>
      {js.map((file, index) => (
        <script key={index} src={`/${file}`} />
      ))}
    </body>
  </html>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  css: PropTypes.array,
  js: PropTypes.array,
  shouldIncludeWebpackDevServerJs: PropTypes.bool,
  title: PropTypes.string,
};

export default App;
