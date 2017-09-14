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

  async getAvailability({VisitDate, PartySize, BookingId, Areas}) {
    const reqData = {
      method: 'POST',
      url: `/Restaurant/${this.restauarant}/AvailabilitySearch`,
      data: {VisitDate, PartySize, channelCode: 'ONLINE'}
    };
    const apiCalls = [];

    if (BookingId) {
      reqData.data.BookingId = BookingId;
    }

    for (let area of Areas) {
      apiCalls.push(axios.post(this.api, qs.stringify({...reqData, AreaID: area.Id})));
    }

    const areaData = await Promise.all(apiCalls);

    return Areas.map((area, i) => ({...area, ...areaData[i].data.data}));
  }

  async createBooking({}) {
    const reqData = {
      method: 'POST',
      url: `/Restaurant/${this.restauarant}/BookingWithStripeToken`,
      data: {
        ChannelCode: 'ONLINE',
        VisitDate: "2017-09-12T21:18:39",
        VisitTime: "00:00:00.1234567",
        PartySize: 1,
        // SpecialRequests: "sample string 2",
        Customer: {
          FirstName: "sample string 3",
          Surname: "sample string 4",
          Phone: "sample string 6",
          Email: "sample string 7",
        }
      }
    };
    const {data: {data}} = await axios.post(this.api, qs.stringify(reqData));

    return data;
  }

}

export default new ResDiary();
