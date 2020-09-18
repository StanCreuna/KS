import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import imageResizer from './js/image-resizer';
import cn from 'classnames';

const DefaultWidth = 0;
const DefaultHeight = 0;

/**
 * Image
 *
 * Key notes:
 * - automatically responsive by default (size is automatically calculated from container size)
 * - default transform is 'fill'
 * - width or height can be fixed (useful for fluid images), in this case default transform is 'fit'
 * - when both width and height are defined it becomes unresponsive.
 * - can be rendered as fluid or ordinary image
 * - widthReasolution and heightResolution it is kind of steps for automatic width/height calculation, for example if withResolution is 100, image will have with 100,200,300...1200...
 * - default resolutions for images with size > 100 is 100 for < 100 is 10
 * - device pixel ratio is taken into account for calculating image size
 *
 * Transforms:
 * 'fill' - image is cropped according to container proportions to fill it completely.
 * 'fit' - image is resized with saving original proportions to fit container by width or height.
 *
 * IMPORTANT:
 * Image must be used with a CSS container that specifies either width or height, or no image will
 * be rendered.
 */
class CalendarImage extends React.Component {
  static transforms = {
    fill: 'fill',
    fit: 'fit',
  };

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    transform: PropTypes.oneOf(Object.values(CalendarImage.transforms)),
    fluid: PropTypes.bool,
    focusPoint: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    widthResolution: PropTypes.number,
    heightResolution: PropTypes.number,
  };

  static propTypesMeta = {
    className: 'exclude',
    transform: 'exclude',
    fluid: 'exclude',
    width: 'exclude',
    height: 'exclude',
    widthResolution: 'exclude',
    heightResolution: 'exclude',
  };

  canBeResized = imageResizer.checkImageCanBeResized(this.props.src);
  state = {
    src: !this.canBeResized
      ? this.props.src
      : DefaultWidth > 0 || DefaultHeight > 0
      ? imageResizer.buildResizeUrl(
          this.props.src,
          DefaultWidth,
          DefaultHeight,
          this.resizeTransform
        )
      : undefined,
    width: 0,
    height: 0,
    ratio: 0,
    containerOffsetWidth: 0,
    containerOffsetHeight: 0,
  };

  autoTransform = CalendarImage.transforms.fill;
  autoCalcWidthOnly = false;
  autoCalcHeightOnly = false;

  handleResize = () => {
    if (
      !this.container ||
      (this.container.offsetWidth === 0 && this.container.offsetHeight === 0)
    ) {
      return;
    }

    if (this.container.offsetWidth === 0 || this.container.offsetHeight === 0) {
      this.autoTransform = CalendarImage.transforms.fit;
      this.autoCalcWidthOnly = this.container.offsetWidth > 0;
      this.autoCalcHeightOnly = this.container.offsetHeight > 0;
    }

    const skipByWidth =
      this.container.offsetWidth === this.state.containerOffsetWidth ||
      (this.props.width > 0 && this.state.width === this.props.width);
    const skipByHeight =
      this.container.offsetHeight === this.state.containerOffsetHeight ||
      (this.props.height > 0 && this.state.height === this.props.height);

    if (skipByWidth && skipByHeight) {
      return;
    }

    const widthResolution =
      this.props.widthResolution > 0
        ? this.props.widthResolution
        : this.container.offsetWidth > 100
        ? 100
        : 10;

    const heightResolution =
      this.props.heightResolution > 0
        ? this.props.heightResolution
        : this.container.offsetHeight > 100
        ? 100
        : 10;

    const newWidth =
      this.props.width > 0
        ? this.props.width
        : this.autoCalcHeightOnly
        ? 0
        : imageResizer.calcImageWidth(
            this.container.offsetWidth,
            widthResolution
          );

    const newHeight =
      this.props.height > 0
        ? this.props.height
        : this.autoCalcWidthOnly
        ? 0
        : imageResizer.calcImageHeight(
            this.container.offsetHeight,
            heightResolution
          );

    const newRatio = newHeight > 0 ? Math.ceil(newWidth / newHeight) : 1;

    this.setState(previousState => {
      if (
        previousState.width >= newWidth &&
        previousState.height >= newHeight &&
        previousState.ratio === newRatio
      ) {
        return {
          containerOffsetWidth: this.container.offsetWidth,
          containerOffsetHeight: this.container.offsetHeight,
        };
      }

      const newSrc = imageResizer.buildResizeUrl(
        this.props.src,
        newWidth,
        newHeight,
        this.props.transform ||
          this.autoTransform === CalendarImage.transforms.fill
          ? imageResizer.Transforms.downFill
          : imageResizer.Transforms.downFit,
        this.props.focusPoint ? this.props.focusPoint.x : null,
        this.props.focusPoint ? this.props.focusPoint.y : null
      );

      return {
        src: newSrc,
        width: newWidth,
        height: newHeight,
        ratio: newRatio,
        containerOffsetWidth: this.container.offsetWidth,
        containerOffsetHeight: this.container.offsetHeight,
      };
    });
  };

  debouncedHandleResize = debounce(this.handleResize, 300);

  componentDidMount() {
    if (this.canBeResized) {
      this.debouncedHandleResize();
      window.addEventListener('resize', this.debouncedHandleResize);
    }
    this.setState({ componentDidMount: true });
  }

  componentWillUnmount() {
    if (this.canBeResized) {
      window.removeEventListener('resize', this.debouncedHandleResize);
    }
  }

  componentDidUpdate() {
    if (this.canBeResized) this.debouncedHandleResize();
  }

  render() {
    if (!this.props.fluid) {
      return (
        <span
          className={cn('calendar-image', this.props.className)}
          ref={c => (this.container = c)}
        >
          {this.state.src && (
            <img
              className="calendar-image__img"
              src={this.state.src}
              alt={this.props.alt ? this.props.alt : ''}
            />
          )}
        </span>
      );
    } else {
      return (
        <span
          className={cn(
            'calendar-image calendar-image_fluid',
            this.props.className
          )}
          style={{
            backgroundImage: this.state.src
              ? `url(${this.state.src})`
              : undefined,
            backgroundPosition: this.props.focusPoint
              ? `${this.props.focusPoint.x}% ${this.props.focusPoint.y}%`
              : null,
          }}
          ref={c => (this.container = c)}
        >
          {this.state.src && (
            <img
              className="calendar-image__img"
              src={this.state.src}
              alt={this.props.alt}
            />
          )}
        </span>
      );
    }
  }
}

export default CalendarImage;
