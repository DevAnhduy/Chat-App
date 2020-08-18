import Axios from 'axios';
const { __server } = require('config/constant.json');

const check_auth = async (callback) => {
    try {
        Axios.get(`${process.env.REACT_APP_API_URL}/check-auth`, 
            { withCredentials: true,
              headers: {
                authorization : window.localStorage.token
              } 
            })
            .then(response => {
                return callback(response.data);
            })
            .catch(error => console.log(error))
    }
    catch (err) {
        console.log(err)
    }
}

export default check_auth