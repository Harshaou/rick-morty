import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './styles.module.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default Loader;
