import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollDown: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    animation: 'bounce 2s infinite',
  },
  scrollText: {
    fontSize: '1rem',
    marginBottom: '10px',
    color: 'inherit',
  },
  arrow: {
    border: 'solid',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '6px',
    transform: 'rotate(45deg)',
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-20px)',
    },
    '60%': {
      transform: 'translateY(-10px)',
    },
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
        40% { transform: translateY(-20px) translateX(-50%); }
        60% { transform: translateY(-10px) translateX(-50%); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data?.name}</h1>
        <div style={{ flexDirection: 'row' }}>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        <Social />
        
        <div 
          style={styles.scrollDown}
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to see more content"
        >
          <span style={styles.scrollText}>Scroll down</span>
          <i style={styles.arrow}></i>
        </div>
      </div>
    </Fade>
  ) : <FallbackSpinner />;
}

export default Home;
