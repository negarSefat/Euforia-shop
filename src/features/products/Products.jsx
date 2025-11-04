import Header from '../../assets/component/Header';
import Cards from './Cards';

export default function Products() {
  return (
    <>
      <div
        style={{
          fontFamily: 'causten',
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        Our Collection
      </div>
      <Cards />
    </>
  );
}
