export default function Header() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <img className="mainPic" src="mainPic.png" alt="clothing shop" />
        <span
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#353753',
            position: 'absolute',
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Vintage Dresses
        </span>
        <p
          style={{
            fontSize: '14px',
            position: 'absolute',
            left: '50%',
            top: '55%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            textAlign: 'center',
            lineHeight: '2',
          }}
        >
          Browse through our collection and find the vintage dress that
          resonates with your style. Whether you're attending a special event or
          simply adding a touch of vintage to your everyday wardrobe.
        </p>
      </div>
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
    </>
  );
}
