import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Link from 'components/Link';
import Image from 'components/Image';

const Logo = ({ image, link, className }) => {
  return (
    <div className={cn('logo', className)}>
      <Link className="logo__link" {...link}>
        <Image className={cn('image_size_' + className)} {...image} />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  image: PropTypes.exact(Image.propTypes),
  link: PropTypes.exact(Link.propTypes),
  className: PropTypes.string,
};

Logo.propTypesMeta = {
  className: 'exclude',
};

export default Logo;
