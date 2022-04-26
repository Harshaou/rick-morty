import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';
import { Button } from 'antd';
import Loader from '../../components/Loader';
import config from '../../config';
import Status from '../../components/Status';

const HomeComponent = () => {
  const TOTAL_PAGES = 42;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [charecters, setCharecters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  //fetching data, reomving duplicates and updating state
  const getCharecters = async () => {
    setLoading(true);
    const response = await axios.get(`${config.baseUrl}/character/?page=${pageNumber}`);
    let all = new Set([...charecters, ...response.data.results]);
    setCharecters([...all]);
    setLoading(false);
  };

  //Checking if the page is the last page or else it will fetch the next page
  useEffect(() => {
    if (pageNumber <= TOTAL_PAGES) {
      getCharecters();
    }
  }, [pageNumber]);

  //Checking intersection is reached. if yes, it will update page number
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      console.log(first.isIntersecting);
      if (first.isIntersecting) {
        // console.log('Intersecting');
        setPageNumber((prevNumb) => prevNumb + 1);
      }
    }),
  );

  //Observing the last element and running cleanup function
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

  const handleViewDetail = (item) => {
    navigate(`/${item.name}`, { state: item });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{`Rick & Morty Characters`}</h1>
      <div className={styles.wrapper}>
        {charecters?.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.box}
              ref={(el) => {
                console.log(el, index);
                if (index === charecters.length - 1) {
                  setLastElement(el);
                }
              }}
            >
              <div className={styles.imgDiv}>
                <img src={item.image} alt="character" className={styles.image} />
              </div>
              <div className={styles.details}>
                <Status status={item.status} />
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
      {loading && <Loader />}
      {pageNumber - 1 === TOTAL_PAGES && <p>♥</p>}
    </div>
  );
};

export default HomeComponent;
