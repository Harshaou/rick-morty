import styles from './index.module.css';

const PersonlInfo = ({ state }) => {
  return (
    <>
      <div className={styles.info}>
        <h1> {state.name}</h1>
        <div className={styles.infoBox}>
          <p>{state.gender}</p>
          <span>|</span>
          <p>{state.species}</p>
        </div>
      </div>
    </>
  );
};

export default PersonlInfo;
