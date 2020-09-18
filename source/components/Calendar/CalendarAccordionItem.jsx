import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Collapse from 'react-tiny-collapse';
import useToggle from './hooks/use-toggle';
import CalendarIcon from './CalendarIcon';
import CalendarPoorText from './CalendarPoorText';

const CalendarAccordionItem = ({ label, textHtml, dropdownImage, htmlId }) => {
  const [isExpanded, toggle] = useToggle(false);

  return (
    <div
      className={cn('calendar-accordion-item', {
        'calendar-accordion-item_active': isExpanded,
      })}
    >
      <button
        className="calendar-accordion-item__button"
        aria-controls={htmlId}
        aria-expanded={isExpanded}
        onClick={toggle}
        type="button"
      >
        <div className="calendar-accordion-item__header">
          <div className="calendar-accordion-item__header-text">{label}</div>
          <div className="calendar-accordion-item__icon-holder">
            <CalendarIcon
              url={dropdownImage}
              className={cn('calendar-accordion-item__icon', {
                'calendar-accordion-item__icon_expanded': isExpanded,
              })}
            />
          </div>
        </div>
      </button>

      <Collapse
        componentProps={{ id: htmlId }}
        isOpen={isExpanded}
        duration={400}
        easing="cubic-bezier(.02, .01, .47, 1)"
      >
        <div className="calendar-accordion-item__content">
          {textHtml && <CalendarPoorText text={textHtml} />}
        </div>
      </Collapse>
    </div>
  );
};

CalendarAccordionItem.propTypes = {
  label: PropTypes.string,
  textHtml: PropTypes.string,
  dropdownImage: PropTypes.string,
  htmlId: PropTypes.number,
};

export default CalendarAccordionItem;
