import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

import Status from '../../components/Status';
import Episodes from './Episodes';
import PersonlInfo from './PersonlInfo';
import Loader from '../../components/Loader';
import OriginLocation from './OriginLocation';
import styles from './index.module.css';
import config from '../../config';

const ProfileDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [episode, setEpisodes] = useState([]);
  const [state] = useState(location.state);

  //fetching episodes details to get episode name
  const getEpisodes = async (episodeIds) => {
    const response = await axios.get(`${config.baseUrl}/episode/${episodeIds}`);
    Array.isArray(response.data) ? setEpisodes(response.data) : setEpisodes([response.data]);
  };

  //Generating episodes id(params) to fetch the episodes the character appeared in
  useEffect(() => {
    if (state.episode) {
      let episodeIds = [];
      for (let char of state.episode) {
        episodeIds.push(char.split('/')[char.split('/')?.length - 1]);
      }
      if (episodeIds.length > 0) {
        getEpisodes(episodeIds);
      }
    }
  }, [state.episode]);

  return (
    <div className={styles.container}>
      <ArrowLeftOutlined onClick={() => navigate('/')} className={styles.icon} />
      <div className={styles.box}>
        <div className={styles.imgDiv}>
          <img src={state.image} alt="character" className={styles.image} />
        </div>
        <div className={styles.detailsContainer}>
          <Status status={state.status} />
          <div className={styles.coloumn}>
            <div className={styles.details}>
              <PersonlInfo state={state} />
              {/* Reused same template for Loaction and Origin */}
              <OriginLocation title="Location" data={state.location} />
              <OriginLocation title="Origin" data={state.origin} />
            </div>
            <div className={styles.episodes}>
              <h3 style={{ color: 'rgb(25, 119, 201)' }}>Episodes</h3>
              {episode ? <Episodes episode={episode} /> : <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
