import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import ItemService from '../../services/ItemService'
import shipping from '../../assets/img/ic_shipping@2x.png.png'
import './ProductList.scss';
import Categories from '../Categories/Categories';
import NotFound from '../NotFound/NotFound';
const parseQueryString = require('query-string');
const numeral = require('numeral')

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.itemService = new ItemService();
    this.state = {searchResponse: null};
  }

  async getItems() {
    const { search } = parseQueryString.parse(this.props.location.search)
    const data = await this.itemService.getItems(search);
    this.setState({ searchResponse: data })
  }

  componentDidMount(){
    this.getItems();
  }

  componentDidUpdate(prevProps){
    const currentSearch = parseQueryString.parse(this.props.location.search).search;
    const prevSearch = parseQueryString.parse(prevProps.location.search).search;

    if(currentSearch !== prevSearch){
      this.setState({ searchResponse: null });
      this.getItems();
    }
  }

  renderItemsList(items){
    if(items.length === 0) return <NotFound />

    const lastItem = items.length - 1

    return items.map((item, i) => {
      return(
        <Row key={i} className={"pb-2 pt-2 mr-1 ml-1 ProductList-Row" + (lastItem === i ? " Last": "")}>
          <Col xs={0}>
            <Link className="ProductList-Link" to={`/items/${item.id}`} target="_blank">
              <Image className="ProductList-Image" src={item.picture} />
            </Link>
          </Col>
          <Col md xs={7} className="ml-md-4 pr-1" >
            <Link className="ProductList-Link" to={`/items/${item.id}`} target="_blank">
            <div className="ProductList-Price">
              {numeral(item.price.amount).format('$ 0,0')}
              { item.freeShipping ? <Image className="ml-2 m-2 ProductList-FreeShipping" src={shipping}  /> : false} 
            </div>
            <div>{item.title}</div>
            </Link>
          </Col>
          <Col xs md={'auto'} className="ProductList-Location">
            <span>{item.location}</span>
          </Col>
        </Row>
        )
    })
  }
    
  render() {
    if (this.state.searchResponse === null) return false
    const {items, categories} = this.state.searchResponse

    return (
      <Container>
        <Categories {...{categories}} />
        <Card className="pr-1">
          <Card.Body>{this.renderItemsList(items)}</Card.Body>
        </Card>
      </Container>
    )
  }
}

export default ProductList;
