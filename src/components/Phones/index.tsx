import React from 'react';

import { Container, Phone, Row } from './styles';

const Phones: React.FC = () => {
  return (
    <Container>
      <Row>
        <Phone>541654564</Phone>
        <Phone>x</Phone>
      </Row>
      <Row>
        <Phone>541654564</Phone>
        <Phone>x</Phone>
      </Row>
    </Container>
  );
};

export default Phones;
