import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './styles.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default Loader;