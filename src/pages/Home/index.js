/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';
import { Button } from 'antd';

const HomeComponent = () => {
  const TOTAL_PAGES = 42;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const handleViewDetail = (item) => {
    navigate(`/${item.name}`, { state: item });
  };

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
              <div className={styles.imgDiv}>
                <img src={item.image} alt="character" className={styles.image} />
              </div>
              <div className={styles.details}>
                <div className={styles.status}>
                  <div className={item.status === 'Alive' ? styles.alive : styles.dead}>
                    <p>{item.status}</p>
                  </div>
                </div>
                <h3> {item.name}</h3>
                <div className={styles.textShaded}>
                  <p>Species: {item.species}</p>
                  <p>Gender: {item.gender}</p>
                  <p>Origin: {item.origin?.name}</p>
                  <p>Location: {item.location?.name}</p>
                </div>
                <div>
                  <Button
                    size="large"
                    onClick={() => handleViewDetail(item)}
                    className={styles.button}
                  >
                    View Profile
                  </Button>
                </div>
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
