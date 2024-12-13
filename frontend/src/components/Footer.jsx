import React from 'react';
import logoPrimary from '../assets/logo_primary.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.contentRow}>
        <div style={styles.gridItem}>
          <h3 style={styles.heading}>Contáctanos</h3>
          <p style={styles.text}>+123 456 789</p>
          <p style={styles.text}>soporte@zappas.com</p>
        </div>

        <div style={styles.gridItem}>
          <img src={logoPrimary} alt="Logo" style={styles.logo} />
          <p style={styles.tagline}>El mejor lugar para comprar y vender zapatillas únicas.</p>
        </div>

        <div style={styles.gridItem}>
          <div style={styles.socialIcons}>
            <FontAwesomeIcon icon={faFacebook} style={styles.icon} />
            <FontAwesomeIcon icon={faInstagram} style={styles.icon} />
            <FontAwesomeIcon icon={faTwitter} style={styles.icon} />
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p style={styles.bottomText}>© 2024 Zappas Marketplace. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#222',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
  },
  contentRow: {
    display: 'flex',
    justifyContent: 'space-around',  // Distribuye el contenido con espacio alrededor
    alignItems: 'center',
    marginBottom: '10px',
  },
  gridItem: {
    textAlign: 'center',  // Centra el contenido de cada sección
    padding: '0 10px',
  },
  heading: {
    fontSize: '14px',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '12px',
    margin: '5px 0',
  },
  logo: {
    width: '50px',
    height: 'auto',
    marginBottom: '5px',
  },
  tagline: {
    fontSize: '12px',
    color: '#ccc',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '16px',
  },
  icon: {
    color: '#fff',
  },
  bottomBar: {
    borderTop: '1px solid #444',
    paddingTop: '5px',
  },
  bottomText: {
    fontSize: '10px',
    color: '#aaa',
    margin: 0,
  },
};

export default Footer;