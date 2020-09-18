import React from 'react';
import PropTypes from 'prop-types';

const ExternalPackagesPage = ({ heading, intro, textList }) => {
  return (
    <div className="external-packages-page">
      {heading && intro && textList && (
        <div className="external-packages-page__container">
          <h1 className="external-packages-page__heading">{heading}</h1>
          <span className="external-packages-page__heading-intro">{intro}</span>
          {textList.map((textItem, index) => (
            <div className="external-packages-page__text-item" key={index}>
              {textItem.packageName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ExternalPackagesPage.propTypes = {
  heading: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  textList: PropTypes.arrayOf(
    PropTypes.shape({
      packageName: PropTypes.string,
    })
  ),
};

export default ExternalPackagesPage;
