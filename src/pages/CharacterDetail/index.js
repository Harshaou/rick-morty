/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ProfileDetail.module.css';
import { Button } from 'antd';
import OriginAndLocation from './OriginAndLocation';

const HomeComponent = () => {
  const location = useLocation();
  const [state, setState] = useState(location.state);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.imgDiv}>
          <img src={state.image} alt="character" className={styles.image} />
        </div>
        <div className={styles.details}>
          <div className={styles.status}>
            <div className={state.status === 'Alive' ? styles.alive : styles.dead}>
              <p>{state.status}</p>
            </div>
          </div>
          <h2> {state.name}</h2>
          <div className={styles.textShaded}>
            <p>Species: {state.species}</p>
            <p>Gender: {state.gender}</p>
            <p>Origin: {state.origin?.name}</p>
            <p>Location: {state.location?.name}</p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <OriginAndLocation title="Location" data={state.location} />
            <OriginAndLocation title="Origin" data={state.origin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
