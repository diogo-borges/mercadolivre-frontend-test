const request = require('request-promise');

const baseUrl = 'https://api.mercadolibre.com';

class ItemService {

  async getItemsByQuery(query) {
    const options = {
      uri: `${baseUrl}/sites/MLA/search`,
      qs: {...query, limit: 4},
      json: true
    }

    const response = await request(options);

    if(response.results.length === 0) return {categories:[], items: []};

    const categories = await this.getCategoriesByQuery(response.filters);
    const items = this.getFormatedItems(response.results);
 
    return {categories, items}
  }

  async getItemById(id) {
    const options = {
      uri: `${baseUrl}/items/${id}`,
      json: true
    }
    const result = await request(options);

    if(result.error) return {};

    options.uri += '/description'

    const description = await request(options)

    const categories = await this.getCategoriesByItem(result.category_id);
    const item = this.getFormatedItem(result, description)
 
    return {categories, item}
  }

  getCategoriesByQuery(filters){
    const categories = filters.find(filter=> filter.id === 'category'); 
    return categories ? categories.values[0].path_from_root.map(category => category.name): [];
  }

  async getCategoriesByItem(categoryId){
    const options = {
      uri: `${baseUrl}/categories/${categoryId}`,
      json: true
    }
    const categories = await request(options);
    return !categories.error ? categories.path_from_root.map(category => category.name): [];
  }

  getFormatedItems(items){
    return items.map(item => {
      const data = {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: item.decimals || 0
        },
        picture: item.thumbnail,
        condition: item.condition,
        freeShipping: item.shipping.free_shipping,
        location: item.seller_address.state.name || ""
      }
    return data
    })
  }

  getFormatedItem(item, itemDescription){
    return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: item.decimals || 0
        },
        picture: item.pictures[0].secure_url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: itemDescription.plain_text || ''
      }
  }

}

module.exports = new ItemService();