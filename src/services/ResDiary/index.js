import axios from 'axios';
import qs from 'qs';

class ResDiary {

  constructor() {
    this.api = '/wp-admin/admin-ajax.php?action=resdiary';
    this.restauarant;
  }

  setRestaurant(restaurant) {
    this.restauarant = restaurant;
  }

  async getClosedDates() {
    const reqData = {
      method: 'GET',
      url: `/Restaurant/${this.restauarant}/ClosedDates`
    };
    const {data: {data}} = await axios.post(this.api, qs.stringify(reqData));

    return data;
  }

  async getRestaurantSetup() {
    const reqData = {
      method: 'GET',
      url: `/Restaurant/${this.restauarant}/Setup`,
      data: {date: new Date(), channelCode: 'ONLINE'}
    };
    const {data: {data}} = await axios.post(this.api, qs.stringify(reqData));

    return data;
  }

}

export default new ResDiary();
