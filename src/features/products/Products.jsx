import Header from '../../assets/component/Header';
import Cards from './Cards';

export default function Products() {
  return (
    <>
      {/* <Header /> */}
      <div
        style={{
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
