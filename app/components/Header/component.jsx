import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col, Avatar, Dropdown, Icon, Layout } from 'antd';

import DropdownMenu from './DropdownMenu';

const HeaderComponent = ({ profile }) => {
  return (
    <Layout.Header>
      <Row type="flex" justify="space-between">
        <Col>
          <Typography.Text className="logo">THE MOVIE DB</Typography.Text>
        </Col>

        {profile && (
          <Col>
            <div className="profile">
              <Dropdown overlay={<DropdownMenu />}>
                <div>
                  {profile.avatar ? (
                    <Avatar src={`https://www.gravatar.com/avatar/${profile.avatar}.jpg`} />
                  ) : (
                    <Avatar icon="user" />
                  )}
                  <Typography.Text>
                    {profile.username}
                    <Icon type="caret-down" />
                  </Typography.Text>
                </div>
              </Dropdown>
            </div>
          </Col>
        )}
      </Row>
    </Layout.Header>
  );
};

HeaderComponent.defaultProps = {
  profile: {},
};

HeaderComponent.propTypes = {
  profile: PropTypes.object,
};

export default HeaderComponent;
