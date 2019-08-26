import React, {Component} from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import ItemService from '../../services/ItemService'
import './ProductDetail.scss';
import Categories from '../Categories/Categories';
import NotFound from '../NotFound/NotFound';

const numeral = require('numeral')

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.itemService = new ItemService();
    this.state = {itemDetail: null};
  }

  async getItem() {
    const { id } = this.props.match.params
    const data = await this.itemService.getItem(id);
    this.setState({ itemDetail: data })
  }

  componentDidUpdate(prevProps){
    const currentId = this.props.match.params.id;
    const prevId = prevProps.match.params.id;

    if(currentId !== prevId){
      this.setState({ itemDetail: null });
      this.getItem();
    }
  }

  componentDidMount(){
    this.getItem();
  }

  renderItemsDetail(item){
    if(!item || item === {}) return <NotFound />

    return(
      <Container>
        <Row>
          <Col className="ProductDetail-Image" xs>
          <Image  src={item.picture} />
          </Col>
          <Col md={4} className="pl-md-5 pr-md-5">
            <span className="ProductDetail-Condition">{item.condition === 'new' ? 'Nuevo': 'Usado'} - {item.sold_quantity} vendidos</span>
            <p className="ProductDetail-Title mb-2">{item.title}</p>
            <p className="ProductDetail-Price mb-4">
            {numeral(item.price.amount).format('$ 0,0')}
            </p>
            <Button className="ProductDetail-Button">Comprar</Button>
          </Col>
        </Row>
        <Row>
          <Col md={9} className="mt-5">
          <h5 className="mb-3 mt-md-5">Descripción del producto</h5>
          <p className="ProductDetail-Description">{item.description}</p>
          </Col>
        </Row>
      </Container>
    )
  }
    
  render() {
    if (this.state.itemDetail === null) return false
    
    const {item, categories} = this.state.itemDetail

    return (
      <Container>
        <Categories {...{categories}}/>
        <Card className="mb-3">
          <Card.Body>{this.renderItemsDetail(item)}</Card.Body>
        </Card>
      </Container>
    )
  }
}

export default ProductDetail;
