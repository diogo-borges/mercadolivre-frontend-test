import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import './NotFound.scss';

class NotFound extends Component {

  render(){
    return (
      <Row className="justify-content-center align-items-center">
      <Col md={'auto'}>
      <h4>No hay publicaciones que coincidan con tu búsqueda.</h4>
        <ul>
          <li>
          Revisá la ortografía de la palabra.
          </li>
          <li>
          Utilizá palabras más genéricas o menos palabras.
          </li>
        </ul>
      </Col>
    </Row>
    )
  }
}

export default NotFound;
