const axios = require('axios');

class ResDiary {
  // static #api = 'https://';
  // #apiKey, #restuarant;

  constructor(apiKey, restaurant) {
    this.apiKey = apiKey;
    // this.restaurant = restaurant;
  }

  async getClosedDates() {
    const getClosedDates = await axios.post('https://api.resdiary.com/api/Jwt/Token', {
      "Username": "incipio.resdiaryapi@kotacreative.co.uk",
      "Password": "(cS9F=SqFz{{y+7^a0=JuG/wu)8n[0"
    });
    console.log(getClosedDates);
  }
}

const resDiary = new ResDiary('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTZWxmIiwiYXVkIjoiaHR0cHM6Ly9hcGkucmVzZGlhcnkuY29tIiwibmJmIjoxNTA0MDE1MDcyLCJleHAiOjE1MDQxMDE0NzIsInVuaXF1ZV9uYW1lIjoiaW5jaXBpby5yZXNkaWFyeWFwaUBrb3RhY3JlYXRpdmUuY28udWsifQ.XrE7bSzWDpq4_R6GYfeYEhY5xCwBDJuetFLV_ec9vkg');

resDiary.getClosedDates();