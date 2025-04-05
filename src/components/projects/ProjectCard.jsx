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
    height: '100%', // Make cards equal height
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
  cardBodyStyle: {
    flexGrow: 1, // Allow card body to grow and push footer to bottom
  },
  cardImageStyle: {
    objectFit: 'cover',
    height: '200px', // Consistent image height
  },
  cardFooterStyle: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Col className="mb-4">
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
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
        </Card.Body>

        <Card.Body>
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
