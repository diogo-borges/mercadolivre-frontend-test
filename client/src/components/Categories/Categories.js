import React, {Component} from 'react';
import './Categories.scss';
import { Row } from 'react-bootstrap';

class Categories extends Component {

  renderCategories(categories){
    if(!categories || categories.length === 0) return false;
    
    const lastCategory = categories.length - 1

    return categories.map((category, i) =>{
      if(lastCategory === i){
        return <div className="Bold" key={i}>{category}</div>
      }
      return <div key={i} className="Categories-Arrow">{category}</div>
    })

  }

  render(){
    return (
      <Row className="Categories mt-2 m-1"> {this.renderCategories(this.props.categories)}</Row>
    )
  }
}

export default Categories;
