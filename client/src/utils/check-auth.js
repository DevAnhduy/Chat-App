import Axios from 'axios'

const check_auth = async (callback) => {
    try {
        Axios.get(`${process.env.REACT_APP_API_URL}/check-auth`, 
        {   withCredentials: true,
            headers: {
                authorization : window.localStorage.getItem('JWT')
            } 
        }
            )
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