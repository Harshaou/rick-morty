import { FileFilled } from '@ant-design/icons';
import styles from './Character.module.css';

const Episodes = ({ episode }) => {
  return (
    <div className={styles.EpisodeBox}>
      {episode.length > 0 ? (
        episode?.map((item) => <li key={item.name}>{item.name}</li>)
      ) : (
        <div className={styles.emptyEpisode}>
          <p>No episodes found...</p>
          <FileFilled className={styles.icon} />
        </div>
      )}
    </div>
  );
};

export default Episodes;
