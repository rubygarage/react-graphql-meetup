import React from 'react';
import PropTypes from 'prop-types';

const ImageComponent = ({ className, path, alt }) => (
  <img className={className} src={path} alt={alt} />
);

ImageComponent.defaultProps = {
  className: '',
  path: '',
  alt: '',
};

ImageComponent.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  alt: PropTypes.string,
};

export default ImageComponent;
