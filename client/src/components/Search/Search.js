import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import {Row, Col, Container, Image} from 'react-bootstrap'
import logoML from '../../../src/assets/img/Logo_ML@2x.png.png';
import searchIcon from '../../../src/assets/img/ic_Search@2x.png.png';
import './Search.scss';
const parseQueryString = require('query-string');

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {searchInput: ''};
}

componentDidMount(){
  const { search } = parseQueryString.parse(this.props.location.search)
  if(search){
    this.setState({searchInput: search})
  }
}

updateInputValue(evt){
  this.setState({[evt.target.id]: evt.target.value})
}

searchPoducts = (e) => {
  e.preventDefault();

  const regex = /^MLA[0-9]{9}$/g
  if(regex.test(this.state.searchInput)){
    return this.props.history.push(`/items/${this.state.searchInput}`);
  }

  return this.props.history.push(`/items?search=${this.state.searchInput}`);
}

render(){
  return (
    <div className="Search">
    <Container as={'form'} onSubmit={this.searchPoducts}>
      <Row className="justify-content-center align-items-center">
        <Col xs={'auto'}>
        <Image src={logoML} className="Search-Logo" onClick={()=>this.props.history.push('/')} />       
        </Col>
        <Col xs className="col p-0">
          <input
            id="searchInput"
            placeholder="Nunca dejes de buscar"
            className="Search-Input"
            type="text"
            value={this.state.searchInput}
            onChange={evt => this.updateInputValue(evt)}>
          </input>
        </Col>
        <Col xs={'auto'} className="col-auto pl-0">
          <button className="Search-Button" type="submit">
          <Image src={searchIcon} />   
          </button>
        </Col>
      </Row>
    </Container>
    </div>
   )
}
}

export default withRouter(Search);
