import axios from 'axios';

class ResDiary {

  constructor() {
    this.api = 'https://api.resdiary.com/api/ConsumerApi/v1/Restaurant/';
    this.config = {headers: {}};
  }

  async init(tokenRequest, proxy, restaurant) {
    await this.getToken(tokenRequest, proxy, restaurant);

    return this.getClosedDates();
  }


  async getToken(tokenRequest, proxy, restaurant) {
    let response;

    this.api = `${proxy}${this.api}${restaurant}`;

    if (tokenRequest.startsWith('{') && tokenRequest.endsWith('}')) {
      const {method, data, url} = JSON.parse(tokenRequest);
      const reqData = method === 'get' ? {params: data} : data;

      response = await axios[method](url, reqData);
    } else {
      response = await axios.post(tokenRequest);
    }

    this.config.headers.Authorization = `Bearer ${response.data}`;
    return response.data;
  }

  async getClosedDates() {
    const {data} = await axios.get(`${this.api}/ClosedDates`, this.config);

    return Promise.resolve(data);
  }

}

export default new ResDiary();
