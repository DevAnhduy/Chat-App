import Axios from 'axios';

const call_api = ({url = '',method = 'get', data }) => {
    return Axios({
        method,
        url,
        data
    })
}

export default call_api;