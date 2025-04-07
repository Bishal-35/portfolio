import React, { useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
    width: "100%",
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
    height: '60px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    marginBottom: '15px',
  },
  cardTextStyle: {
    textAlign: 'left',
    height: '120px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    marginBottom: '15px',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
  cardBodyStyle: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardImageStyle: {
    objectFit: 'cover',
    height: '200px',
    width: '100%',
  },
  cardFooterStyle: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
};

// Media query styles for smaller screens
const mediaQueryStyles = {
  '@media (max-width: 768px)': {
    cardTitleStyle: {
      fontSize: '20px',
      height: '50px',
    },
    cardTextStyle: {
      height: '100px',
    },
  },
  '@media (max-width: 576px)': {
    cardTitleStyle: {
      fontSize: '18px',
      height: '45px',
    },
    cardTextStyle: {
      height: '90px',
    },
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
        className="project-card"
      >
        {project?.image && (
          <Card.Img 
            variant="top" 
            src={project.image} 
            style={styles.cardImageStyle}
          />
        )}
        <Card.Body style={styles.cardBodyStyle}>
          <Card.Title style={styles.cardTitleStyle}>{project.title}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(project.bodyText)}
          </Card.Text>
          
          <div style={styles.buttonContainer}>
            <div className="d-flex flex-wrap">
              {project?.links?.map((link) => (
                <Button
                  key={link.href}
                  style={styles.buttonStyle}
                  variant={'outline-' + theme.bsSecondaryVariant}
                  onClick={() => window.open(link.href, '_blank')}
                  className="me-2 mb-2"
                >
                  {link.text}
                </Button>
              ))}
            </div>
          </div>
        </Card.Body>
        {project.tags && (
          <Card.Footer 
            style={{ 
              backgroundColor: theme.cardFooterBackground,
              ...styles.cardFooterStyle,
            }}
          >
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={theme.bsSecondaryVariant}
                text={theme.bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
