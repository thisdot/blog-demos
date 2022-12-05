const axios = require('axios');

class StarwarsAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://swapi.dev/api/',
    });
  }

  async getPerson(id) {
    const { data } = await this.axios.get(`people/${id}`);
    return data;
  }

  async getHomeworld(id) {
    const { data } = await this.axios.get(`planets/${id}`);
    return data;
  }
}

module.exports = StarwarsAPI;
