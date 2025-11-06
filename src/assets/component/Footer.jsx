import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
  return (
    <footer>
      <div
        className="footer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '30px',
          paddingTop: '10px',
          marginInline: 'auto',
        }}
      >
        <div>
          <div
            className="footer"
            style={{ color: 'white', paddingBottom: '50px' }}
          >
            <div
              className="flexCol"
              style={{ gap: '10px', paddingInline: '40px', paddingTop: '20px' }}
            >
              <span>Home</span>
              <span>About</span>
              <span>Contact</span>
              <span>New Arrivals</span>
            </div>
            <div
              className="flexCol"
              style={{
                gap: '3px',
                paddingInline: '40px',
                paddingTop: '20px',
                fontFamily: 'poppins',
              }}
            >
              <span>Clothing</span>
              <span>euphoria Blog</span>
              <span>euphoriastan</span>
              <span>Media</span>
              <span>Collaboration</span>
            </div>
            <div
              className="flexCol"
              style={{
                gap: '3px',
                paddingInline: '40px',
                paddingTop: '20px',
                fontFamily: 'poppins',
              }}
            >
              <span>Accessories</span>
              <span>Link 1</span>
              <span>Link 2</span>
              <span>Link 3</span>
              <span>Link 4</span>
            </div>
            <div
              className="flexCol"
              style={{
                gap: '15px',
                paddingRight: '15px',
                paddingInline: '40px',
                paddingTop: '20px',
                fontFamily: 'poppins',
              }}
            >
              <div
                className="flexCol"
                style={{
                  gap: '4px',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Email:</span>
                <span>gvclothing@gmail.com</span>
              </div>
              <div
                className="flexCol"
                style={{
                  gap: '4px',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Phone Number:</span>
                <span>gvclothing@gmail.com</span>
              </div>
              <div
                className="flexCol"
                style={{
                  gap: '4px',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>Address:</span>
                <span>
                  144 Meyer St,<br></br>
                  Germiston,1400<br></br>
                  Johannesburg
                </span>
              </div>
            </div>
            <div
              className="flexCol open"
              style={{ paddingTop: '20px', gap: '10px' }}
            >
              <span style={{ fontWeight: 'bold' }}>Opening hour</span>
              <span>Mon-Fri 09:00-18:00</span>
              <span>Saturdays 09:00-14:00</span>
              <span>Sundays closed</span>
              <span>Public holidays closed</span>
              <span></span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white',
            marginInline: '40px',
          }}
        >
          <div>
            <span>© 2025 All rights reserved</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginRight: '10px',
            }}
          >
            <FacebookIcon />
            <InstagramIcon />
            <XIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}
