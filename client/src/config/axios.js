import Axios from 'axios'

const axios_config = () => {
    Axios.defaults.baseURL = process.env.REACT_APP_CALL_API;
    Axios.defaults.headers.common['authorization'] = localStorage.token;
    Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}

export default axios_config;
