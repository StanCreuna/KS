import replaceQueryParameters from '@creuna/utils/replace-query-parameters';
import urlHelper from './url-helper';

const transforms = {
  downFit: 'max',
  downFill: 'crop',
};

const skipForResizeExtensions = ['svg'];

const queryParameters = {
  width: undefined,
  height: undefined,
  mode: undefined,
  center: undefined,
  upscale: false,
};

function checkImageCanBeResized(url) {
  if (!url) return false;
  var extension = urlHelper.getFileExtension(url);
  extension = extension.toLowerCase();
  if (skipForResizeExtensions.some(item => item === extension)) {
    return false;
  }
  return true;
}

function buildResizeUrl(url, width, height, transform, centerX, centerY) {
  if (!checkImageCanBeResized(url)) {
    return url;
  }
  return replaceQueryParameters(
    url,
    Object.assign({}, queryParameters, {
      width: width > 0 ? width : undefined,
      height: height > 0 ? height : undefined,
      mode: transform,
      center:
        transform !== transforms.downFit
          ? serializeCenter(centerX, centerY)
          : undefined,
    })
  );
}

function calcImageWidth(containerWidth, resolution) {
  resolution = resolution > 0 ? resolution : 1;
  return (
    Math.ceil((containerWidth * (window.devicePixelRatio || 1)) / resolution) *
    resolution
  );
}

function calcImageHeight(containerHeight, resolution) {
  resolution = resolution > 0 ? resolution : 1;
  return (
    Math.ceil((containerHeight * (window.devicePixelRatio || 1)) / resolution) *
    resolution
  );
}

function serializeCenter(x, y) {
  if (x > 0 || y > 0) {
    return `${y / 100},${x / 100}`;
  }
  return undefined;
}

export default {
  buildResizeUrl,
  checkImageCanBeResized,
  calcImageWidth,
  calcImageHeight,
  Transforms: transforms,
};
