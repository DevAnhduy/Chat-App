import Axios from 'axios';
const { __server } = require('config/constant.json');

const check_auth = async (callback) => {
    try {
        Axios.get(`${__server}/check-auth`,{
            headers: {
                authorization : window.localStorage.token
            },
            withCredentials: true
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