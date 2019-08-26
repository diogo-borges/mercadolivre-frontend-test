

class ItemService {
  constructor(){
    this.apiUrl = `${process.env.API_URL || 'http://localhost:9000/api'}/items`
  }

  async getItems(query){
    const result = await fetch(`${this.apiUrl}?q=${query}`)
    return result.json();
  }

  async getItem(id){
    const result = await fetch(`${this.apiUrl}/${id}`)
    return result.json();
  }

}

export default ItemService;