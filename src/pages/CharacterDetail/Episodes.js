const Episodes = ({ episode }) => {
  return (
    <ul style={{ overflow: 'scroll', maxHeight: 345 }}>
      {episode?.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  );
};

export default Episodes;
