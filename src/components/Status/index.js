import styles from './Status.module.css';

const Status = ({ status }) => {
  return (
    <div className={styles.status}>
      <div className={status === 'Alive' ? styles.alive : styles.dead}>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Status;
