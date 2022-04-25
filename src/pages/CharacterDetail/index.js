/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Status from './Status';
import Episodes from './Episodes';
import PersonlInfo from './PersonlInfo';
import styles from './Character.module.css';
import Loader from '../../components/Loader';
import OriginLocation from './OriginLocation';

const ProfileDetail = () => {
  const location = useLocation();
  const [episode, setEpisodes] = useState(null);
  const [state] = useState(location.state);

  const getEpisodes = async (episodeIds) => {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
    setEpisodes(response.data);
  };

  useEffect(() => {
    if (state.episode) {
      let episodeIds = [];
      for (let char of state.episode) {
        episodeIds.push(char.split('/')[char.split('/').length - 1]);
      }
      getEpisodes(episodeIds);
    }
  }, [state.episode]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.imgDiv}>
          <img src={state.image} alt="character" className={styles.image} />
        </div>
        <div className={styles.detailsContainer}>
          <Status status={state.status} />
          <div className={styles.coloumn}>
            <div className={styles.details}>
              <PersonlInfo state={state} />
              <div style={{}}>
                <OriginLocation title="Location" data={state.location} />
                <OriginLocation title="Origin" data={state.origin} />
              </div>
            </div>
            <div className={styles.episodes}>
              <h3>Episodes</h3>
              {episode ? <Episodes episode={episode} /> : <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
