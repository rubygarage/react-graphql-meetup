import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Carousel } from 'antd';
import { map } from 'lodash';

import Image from '../../../shared/images/Image';

const MovieCarouselComponent = ({ poster, images, title }) => (
  <Row type="flex">
    <Col span={24}>
      <Carousel autoplay>
        <div>
          <Image className="movie-image" path={poster.filePath} alt={title} />
        </div>
        {map(images, item => (
          <div>
            <Image className="movie-image" path={item.filePath} alt={title} />
          </div>
        ))}
      </Carousel>
    </Col>
  </Row>
);

MovieCarouselComponent.propTypes = {
  images: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieCarouselComponent;
