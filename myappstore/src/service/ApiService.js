import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/owner';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(ownerNo) {
        return axios.get(USER_API_BASE_URL + '/' + ownerNo);
    }

    deletereserve(ownerNo) {
        return axios.delete(USER_API_BASE_URL + '/' + ownerNo);
    }

    addReserve(reserve) {
        return axios.post(""+USER_API_BASE_URL, reserve);
    }   


}

export default new ApiService();