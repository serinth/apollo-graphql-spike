const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'http://localhost:4000';
    }
  
    async getUser(id) {
      return await this.get(`/user/${id}`);
    }
}

module.exports = UsersAPI;