import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="education-wrapper">
      <Header title={header} />
      {data ? (
        <Fade>
          <Container className="education-container">
            <Row className="education-timeline">
              {data.education.map((education, index) => (
                <Col xs={12} key={index} className="education-item">
                  <Card 
                    className="education-card"
                    style={{ 
                      backgroundColor: theme.chronoTheme.cardBgColor,
                      color: theme.chronoTheme.cardForeColor,
                      borderLeft: `5px solid ${theme.accentColor}`
                    }}
                  >
                    <Card.Body>
                      <Row>
                        <Col md={3} className="education-year">
                          <div className="education-duration">
                            {education.title}
                          </div>
                        </Col>
                        <Col md={9} className="education-details">
                          <h3 className="education-degree">{education.cardTitle}</h3>
                          <h4 
                            className="education-school"
                            style={{ color: theme.educationSchoolColor }}
                          >
                            {education.cardSubtitle}
                          </h4>
                          <p className="education-description">{education.cardDetailedText}</p>
                          {education.icon && (
                            <div className="education-icon">
                              <img
                                src={education.icon.src}
                                alt={education.icon.alt}
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Fade>
      ) : <FallbackSpinner /> }
    </div>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
