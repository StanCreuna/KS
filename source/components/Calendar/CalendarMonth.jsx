import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CalendarIcon from './CalendarIcon';
import CalendarLink from './CalendarLink';
import CalendarAccordionItem from './CalendarAccordionItem';

const CalendarMonth = ({
  name,
  heading,
  textHtml,
  customImage,
  customImageWidth,
  externalLinks,
  downloadLinks,
  inactiveLabel,
  additionalInfoLabel,
  additionalInfoIsEmptyLabel,
  attentionImage,
  fileImage,
  dropdownImage,
  monthInfoImage,
  monthFilesImage,
  monthInactiveImage,
  externalLinkImage,
  downloadLinkImage,
  id,
}) => {
  const isVisible =
    name &&
    inactiveLabel &&
    additionalInfoLabel &&
    additionalInfoIsEmptyLabel &&
    attentionImage &&
    fileImage &&
    dropdownImage &&
    monthInfoImage &&
    monthFilesImage &&
    monthInactiveImage &&
    externalLinkImage &&
    downloadLinkImage;

  const isInactive = !(heading && textHtml);
  const isLinksPresent = externalLinks && externalLinks.length > 0;
  const isFilesPresent = downloadLinks && downloadLinks.length > 0;
  const isInformative = !isInactive && !isFilesPresent;
  const isFooterFilled = isLinksPresent || isFilesPresent;
  const linksList =
    (isLinksPresent && externalLinks) || (isFilesPresent && downloadLinks);
  const linkImage =
    (isLinksPresent && externalLinkImage) ||
    (isFilesPresent && downloadLinkImage);
  const footerImage =
    (isLinksPresent && attentionImage) || (isFilesPresent && fileImage);
  const calendarIconUrl =
    (isInactive && monthInactiveImage) ||
    (isFilesPresent && monthFilesImage) ||
    (isInformative && monthInfoImage);

  return (
    isVisible && (
      <div className="calendar-month">
        <div className="calendar-month__main-icon-holder">
          <CalendarIcon url={calendarIconUrl} />
          <span className="calendar-month__name">{name}</span>
        </div>
        {heading && textHtml && (
          <Fragment>
            <CalendarAccordionItem
              label={heading}
              textHtml={textHtml}
              dropdownImage={dropdownImage}
              htmlId={id}
            />
            <div className="calendar-month__footer">
              <span className="calendar-month__footer-label">
                {isFooterFilled
                  ? additionalInfoLabel
                  : additionalInfoIsEmptyLabel}
              </span>
              {isFooterFilled && (
                <div className="calendar-month__footer-links-list">
                  {linksList.map((link, index) => (
                    <div
                      className="calendar-month__footer-link-item"
                      key={index}
                    >
                      <CalendarLink {...link}>
                        <span className="calendar-month__footer-link-icon-holder">
                          <CalendarIcon url={linkImage} />
                        </span>
                      </CalendarLink>
                    </div>
                  ))}
                </div>
              )}
              {isFooterFilled && (
                <div className="calendar-month__footer-icon-holder">
                  <CalendarIcon url={footerImage} />
                </div>
              )}
            </div>
          </Fragment>
        )}
        {isInactive && (
          <span className="calendar-month__inactive-label">
            {inactiveLabel}
          </span>
        )}
        {isInactive && customImage && (
          <div
            className="calendar-month__custom-image-holder"
            style={{ width: `${customImageWidth}px` }}
          >
            <CalendarIcon url={customImage} />
          </div>
        )}
      </div>
    )
  );
};

CalendarMonth.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string,
  textHtml: PropTypes.string,
  customImage: PropTypes.string,
  customImageWidth: PropTypes.string,
  externalLinks: PropTypes.arrayOf(PropTypes.exact(CalendarLink.propTypes)),
  downloadLinks: PropTypes.arrayOf(PropTypes.exact(CalendarLink.propTypes)),
  inactiveLabel: PropTypes.string,
  additionalInfoLabel: PropTypes.string,
  additionalInfoIsEmptyLabel: PropTypes.string,
  attentionImage: PropTypes.string,
  fileImage: PropTypes.string,
  dropdownImage: PropTypes.string,
  monthInfoImage: PropTypes.string,
  monthFilesImage: PropTypes.string,
  monthInactiveImage: PropTypes.string,
  externalLinkImage: PropTypes.string,
  downloadLinkImage: PropTypes.string,
  id: PropTypes.number,
};

CalendarMonth.propTypesMeta = {
  id: 'exclude',
};

export default CalendarMonth;
