import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 '>Copyrights &copy; MyShop</Col>
          <Col className='text-center py-3 '>Made with ❤ by Seersol.</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
