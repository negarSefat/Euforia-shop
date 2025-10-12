import { useNavigate } from 'react-router-dom';

export default function Emptycart() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        fontFamily: 'causten',
        fontSize: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px',
        marginTop: '50px',
        marginBottom: '50px',
        padding: '20px',
      }}
    >
      <img style={{ width: '200px' }} src="empty.png" alt="empty cart" />
      <span>Your cart is empty</span>
      <span style={{ fontSize: '14px', color: '#565555ff' }}>
        Add something
      </span>
      <button
        onClick={() => navigate('/products')}
        style={{
          cursor: 'pointer',
          padding: '12px',
          borderRadius: '10px',
          fontFamily: 'causten',
          backgroundColor: '#1976d2',
          color: 'white',
        }}
      >
        Continue shopping
      </button>
    </div>
  );
}
