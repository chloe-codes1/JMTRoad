import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:1217/';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(ownerNo) {
        return axios.get(USER_API_BASE_URL + '/' + ownerNo);
    }

    deleteUser(ownerNo) {
        return axios.delete(USER_API_BASE_URL + '/' + ownerNo);
    }

    addUser(ownerNo) {
        return axios.post(""+USER_API_BASE_URL, ownerNo);
    }

    editUser(ownerNo) {
        return axios.put(USER_API_BASE_URL + '/' + ownerNo.ownerNo, ownerNo);
    }

    fetchReviewById(storereviewNo) {
        return axios.get(USER_API_BASE_URL + '/' + storereviewNo);
    }

    deleteReview(storereviewNo) {
        return axios.delete(USER_API_BASE_URL + '/' + storereviewNo);
    }

    addReview(storereviewNo) {
        return axios.post(""+USER_API_BASE_URL, storereviewNo);
    }

}



export default new ApiService();