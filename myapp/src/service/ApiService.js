import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/reserve';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(waitNO) {
        return axios.get(USER_API_BASE_URL + '/' + waitNO);
    }

    deletereserve(waitNO) {
        return axios.delete(USER_API_BASE_URL + '/' + waitNO);
    }

    addUser(reserve) {
        return axios.post(""+USER_API_BASE_URL, reserve);
    }



}

export default new ApiService();