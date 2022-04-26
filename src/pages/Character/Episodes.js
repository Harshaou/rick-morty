import { FileFilled } from '@ant-design/icons';

const Episodes = ({ episode }) => {
  return (
    <div style={{ overflow: 'scroll', maxHeight: 380, height: '100%' }}>
      {episode.length > 0 ? (
        episode?.map((item) => <li key={item.name}>{item.name}</li>)
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>No episodes found...</p>
          <FileFilled style={{ fontSize: '22px', color: 'rgb(25, 119, 201)', marginTop: 20 }} />
        </div>
      )}
    </div>
  );
};

export default Episodes;
