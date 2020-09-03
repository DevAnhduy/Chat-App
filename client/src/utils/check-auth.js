import Axios from 'axios';
const { __server } = require('config/constant.json');
const jwt_decoded = require('jwt-decode');

const check_auth = async (callback) => {
    try {
        if(localStorage.token){
          const decoded = jwt_decoded(localStorage.token);
          Axios.get(`${process.env.REACT_APP_API_URL}/users/${decoded.user_id}`,{
            headers : {
              authorization : localStorage.token
            }
          })
            .then(response => {
              return callback(response.data.data)
            })
            .catch(error => callback(false))
        }
        else {
          return callback(false)
        }
    }
    catch (err) {
        console.log(err)
    }
}

export default check_auth