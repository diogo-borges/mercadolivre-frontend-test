const ItemService = require('../services/item.service');

class ItemController {

  async getItems(request, response) {
    try {
      const { query } = request;
      const data = await ItemService.getItemsByQuery(query);

      response.send(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getItem(request, response) {
    try {
      const { id } = request.params;
      const data = await ItemService.getItemById(id);

      response.send(data);
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new ItemController();