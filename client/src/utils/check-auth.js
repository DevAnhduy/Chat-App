import Axios from 'axios'

const check_auth = async (callback) => {
    try {
        Axios.get('http://localhost:3001/check-auth', { withCredentials: true })
            .then(response => {
                return callback(response.data.is_auth);
            })
            .catch(error => console.log(error))
    }
    catch (err) {
        console.log(err)
    }
}

export default check_auth