import Axios from 'axios';
const { __server } = require('config/constant.json');
const jwt_decoded = require('jwt-decode');

const check_auth = async (callback) => {
    try {
        if(localStorage.token){
          return callback(jwt_decoded(localStorage.token))
        }
        else {
          return callback(false)
        }
        // Axios.get(`${process.env.REACT_APP_API_URL}/check-auth`, 
        //     { 
        //       headers: {
        //         authorization : window.localStorage.token
        //       } 
        //     })
        //     .then(response => {
        //       console.log(response)
        //         return callback(response.data);
        //     })
        //     .catch(error => {
        //       console.log(error)
        //     })
    }
    catch (err) {
        console.log(err)
    }
}

export default check_auth