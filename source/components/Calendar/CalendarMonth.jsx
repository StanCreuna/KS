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
  links,
  inactiveLabel,
  additionalInfoDownloadsLabel,
  additionalInfoLinksLabel,
  additionalInfoFullLabel,
  attentionImage,
  fileImage,
  mixedImage,
  dropdownImage,
  monthInfoImage,
  monthFilesImage,
  monthMixedImage,
  monthInactiveImage,
  externalLinkImage,
  downloadLinkImage,
  id,
}) => {
  const isVisible =
    name &&
    inactiveLabel &&
    additionalInfoDownloadsLabel &&
    additionalInfoLinksLabel &&
    additionalInfoFullLabel &&
    attentionImage &&
    fileImage &&
    mixedImage &&
    dropdownImage &&
    monthInfoImage &&
    monthFilesImage &&
    monthMixedImage &&
    monthInactiveImage &&
    externalLinkImage &&
    downloadLinkImage;

  const isInactive = !heading;
  const isLinksListFilled = links && links.length > 0;
  const isLinksPresent =
    isLinksListFilled && links.find(o => o.download === false);
  const isFilesPresent =
    isLinksListFilled && links.find(o => o.download === true);
  const isInformative = !isInactive && !isFilesPresent;
  const footerImage =
    (isLinksPresent && isFilesPresent && mixedImage) ||
    (isLinksPresent && attentionImage) ||
    (isFilesPresent && fileImage);
  const calendarIconUrl =
    (isInactive && monthInactiveImage) ||
    (isFilesPresent && isLinksPresent && monthMixedImage) ||
    (isFilesPresent && monthFilesImage) ||
    (isInformative && monthInfoImage);
  const footerLabel =
    (isFilesPresent && isLinksPresent && additionalInfoFullLabel) ||
    (isFilesPresent && additionalInfoDownloadsLabel) ||
    (isInformative && additionalInfoLinksLabel);

  return (
    isVisible && (
      <div className="calendar-month">
        <div className="calendar-month__main-icon-holder">
          <CalendarIcon url={calendarIconUrl} />
          <span className="calendar-month__name">{name}</span>
        </div>
        {heading && (
          <Fragment>
            <CalendarAccordionItem
              label={heading}
              textHtml={textHtml}
              dropdownImage={dropdownImage}
              htmlId={id}
            />
            {isLinksListFilled && (
              <div className="calendar-month__footer">
                <span className="calendar-month__footer-label">
                  {footerLabel}
                </span>
                <div className="calendar-month__footer-links-list">
                  {links.map((link, index) => (
                    <div
                      className="calendar-month__footer-link-item"
                      key={index}
                    >
                      <CalendarLink {...link}>
                        <span className="calendar-month__footer-link-icon-holder">
                          <CalendarIcon
                            url={
                              link.download
                                ? downloadLinkImage
                                : externalLinkImage
                            }
                          />
                        </span>
                      </CalendarLink>
                    </div>
                  ))}
                </div>
                <div className="calendar-month__footer-icon-holder">
                  <CalendarIcon url={footerImage} />
                </div>
              </div>
            )}
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
            <div className="calendar-month__custom-image">
              <CalendarIcon url={customImage} />
            </div>
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
  links: PropTypes.arrayOf(PropTypes.exact(CalendarLink.propTypes)),
  inactiveLabel: PropTypes.string,
  additionalInfoDownloadsLabel: PropTypes.string,
  additionalInfoLinksLabel: PropTypes.string,
  additionalInfoFullLabel: PropTypes.string,
  attentionImage: PropTypes.string,
  fileImage: PropTypes.string,
  mixedImage: PropTypes.string,
  dropdownImage: PropTypes.string,
  monthInfoImage: PropTypes.string,
  monthFilesImage: PropTypes.string,
  monthMixedImage: PropTypes.string,
  monthInactiveImage: PropTypes.string,
  externalLinkImage: PropTypes.string,
  downloadLinkImage: PropTypes.string,
  id: PropTypes.number,
};

CalendarMonth.propTypesMeta = {
  id: 'exclude',
};

export default CalendarMonth;
