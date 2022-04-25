import styles from './Character.module.css';

const PersonlInfo = ({ state }) => {
  return (
    <>
      <h2> {state.name}</h2>
      <div className={styles.textShaded}>
        <p>Species: {state.species}</p>
        <p>Gender: {state.gender}</p>
        <p>Origin: {state.origin?.name}</p>
        <p>Location: {state.location?.name}</p>
      </div>
    </>
  );
};

export default PersonlInfo;
