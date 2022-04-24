/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import styles from './Home.module.css';

const HomeComponent = () => {
  const TOTAL_PAGES = 42;
  const [loading, setLoading] = useState(true);
  const [charecters, setCharecters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const getCharecters = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`,
    );
    let all = new Set([...charecters, ...response.data.results]);
    setCharecters([...all]);
    setLoading(false);
  };

  useEffect(() => {
    if (pageNumber <= TOTAL_PAGES) {
      getCharecters();
    }
  }, [pageNumber]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNumber((prevNumb) => prevNumb + 1);
      }
    }),
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  console.log(charecters);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {charecters?.map((item, index) => {
          return (
            <div
              key={index}
              ref={(el) => {
                if (index === charecters.length - 1) {
                  setLastElement(el);
                }
              }}
              className={styles.box}
            >
              <div style={{ width: '40%', height: '100%' }}>
                <img src={item.image} alt="character" className={styles.image} />
              </div>
              <div className={styles.details}>
                <h3 className={styles.name}>{item.name}</h3>
                <p className={styles.name}>{item.species}</p>
                <p className={styles.name}>{item.gender}</p>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <p className="text-center">loading...</p>}

      {pageNumber - 1 === TOTAL_PAGES && <p className="text-center my-10">♥</p>}
    </div>
  );
};

export default HomeComponent;
