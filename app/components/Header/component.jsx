import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col, Avatar, Dropdown, Icon, Layout } from 'antd';
import { isEmpty } from 'lodash';

import DropdownMenu from './DropdownMenu';

const HeaderComponent = ({ profile }) => {
  return (
    <Layout.Header className="header">
      <Row type="flex" justify="space-between">
        <Col>
          THE MOVIE DB
        </Col>

        {!isEmpty(profile) && (
          <Col>
            <div className="profile">
              <Dropdown overlay={<DropdownMenu />}>
                <div>
                  <Avatar icon="user" />
                  {` ${profile.userProfile.fullName} `}
                  <Icon type="caret-down" />
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
