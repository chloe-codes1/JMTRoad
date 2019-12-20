import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:1217/';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(ownerNo) {
        return axios.get(USER_API_BASE_URL + '/' + ownerNo);
    }

    StoreinfodeleteUser(ownerNo) {
        return axios.delete(USER_API_BASE_URL + '/' + ownerNo);
    }

    StoreinfoaddUser(ownerNo) {
        return axios.post(""+USER_API_BASE_URL, ownerNo);
    }

    StoreinfoeditUser(ownerNo) {
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

    fetchUserById(waitNO) {
        return axios.get(USER_API_BASE_URL + '/' + waitNO);
    }

    deletereserve(waitNO) {
        return axios.delete(USER_API_BASE_URL + '/' + waitNO);
    }

    // addUser(reserve) {
    //     return axios.post(""+USER_API_BASE_URL, reserve);
    // }




}



export default new ApiService();