/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';

const Location = ({ data, title }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);

  const getCharecters = async () => {
    setLoading(true);
    const response = await axios.get(data.url);
    setState(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getCharecters();
  }, [data]);

  return (
    <div style={{ borderRadius: 7 }}>
      <h3 style={{}}>{title}</h3>
      <p>Name: {data.name}</p>
      {state ? (
        <>
          <p>Dimension: {state.dimension}</p>
          <p>Residents count: {state.residents.length}</p>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Location;
