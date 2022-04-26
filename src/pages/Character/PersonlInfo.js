import styles from './Character.module.css';

const PersonlInfo = ({ state }) => {
  return (
    <>
      <div className={styles.info}>
        <h1> {state.name}</h1>
        <div style={{ display: 'flex', gap: 5, marginBottom: 10, alignItems: 'center' }}>
          <p>{state.gender}</p>
          <span>|</span>
          <p>{state.species}</p>
        </div>
      </div>
    </>
  );
};

export default PersonlInfo;
