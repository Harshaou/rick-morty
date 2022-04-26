/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { FileFilled } from '@ant-design/icons';

import axios from 'axios';
import Loader from '../../components/Loader';
import styles from './Character.module.css';

const Location = ({ data, title }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);

  const getCharecters = async () => {
    setLoading(true);
    const response = await axios.get(data.url);
    setState(response.data);
    setLoading(false);
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
          <FileFilled
            style={{
              fontSize: '20px',
              color: 'rgb(176, 204, 213)',
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Location;
