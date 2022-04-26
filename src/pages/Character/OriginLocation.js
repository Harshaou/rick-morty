/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { FileFilled } from '@ant-design/icons';

import axios from 'axios';
import styles from './Character.module.css';

const Location = ({ data, title }) => {
  const [state, setState] = useState(null);

  const getCharecters = async () => {
    const response = await axios.get(data.url);
    setState(response.data);
  };

  useEffect(() => {
    getCharecters();
  }, [data]);

  return (
    <div className={styles.originLocation}>
      <h3>{title}</h3>
      {state ? (
        <>
          <p>Name: {data.name}</p>
          <p>Dimension: {state.dimension}</p>
          <p>Residents count: {state.residents.length}</p>
        </>
      ) : (
        <>
          <p>Nothing found...</p>
          <FileFilled className={styles.icon} />
        </>
      )}
    </div>
  );
};

export default Location;
