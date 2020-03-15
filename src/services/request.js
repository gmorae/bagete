import axios from 'axios';

const Request = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://bagueteccb.herokuapp.com/' ,
    headers: {
        'Content-Type' : 'application/json',
    }
});


export default Request;