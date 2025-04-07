import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 5,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',  // Reduced from 1.3em to 1.1em
    fontWeight: 500,
    paddingTop: 90,
  },
  introImageContainer: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  profileImage: {
    maxWidth: '80%',
    maxHeight: '400px',
    borderRadius: '5px',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
      
    // Add window resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive styles based on window width
  const getResponsiveStyles = () => {
    if (windowWidth <= 768) {
      return {
        introTextContainer: {
          ...styles.introTextContainer,
          fontSize: '1.1em',
          paddingTop: 40,
          textAlign: 'center',
        },
        profileImage: {
          ...styles.profileImage,
          maxWidth: '90%',
          maxHeight: '300px',
          marginTop: '20px',
        },
      };
    }
    return styles;
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row className={windowWidth <= 768 ? "flex-column-reverse" : ""}>
                  <Col style={responsiveStyles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img 
                      src={data?.imageSource} 
                      alt="profile" 
                      style={responsiveStyles.profileImage}
                    />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
