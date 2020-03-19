import axios from 'axios';

class Services {
  constructor() {
    this.baseUrl = 'https://www.mocky.io/v2/5c9105cb330000112b649af8';
  }

  get() {
    return axios.get(`${this.baseUrl}`).then(({ data }) => data);
  }
}

export default Services;
