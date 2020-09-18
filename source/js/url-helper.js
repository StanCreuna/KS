const getFileExtension = url =>
  url && url.split(/#|\?/)[0].split('.').pop().trim();

export default {
  getFileExtension,
};
