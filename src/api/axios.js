import axios from 'axios';

const instance = axios.create({
    'xsrfCookieName' : 'north_Shore__Wave___Rider',
    'xsrfHeaderName' : 'csrf-token'
});

export default instance;
