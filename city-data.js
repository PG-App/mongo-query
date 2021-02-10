const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
  params: {query: 'paris', searchby: 'city'},
  headers: {
    'x-rapidapi-key': '327a845cd1msh24c472eb2d4eaccp1cafacjsn48fb1d7fa305',
    'x-rapidapi-host': 'andruxnet-world-cities-v1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});