import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:1217/';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }
    //***** 음식점 페이지(store-info) *****
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
//***** 여기까지 음식점 페이지(store-info) **********

//***** 음식점 페이지의 리뷰작성부분 **********
    fetchReviewById(storereviewNo) {
        return axios.get(USER_API_BASE_URL + '/' + storereviewNo);
    }

    deleteReview(storereviewNo) {
        return axios.delete(USER_API_BASE_URL + '/' + storereviewNo);
    }

    //addReview(storereviewNo) {
    //    return axios.post(""+USER_API_BASE_URL, storereviewNo);
    //}
//***** 여기까지 음식점 페이지의 리뷰작성부분 **********

//***** 음식점 원격대기부분 **********
    fetchUserById(waitNO) {
        return axios.get(USER_API_BASE_URL + '/' + waitNO);
    }

    deletereserve(waitNO) {
        return axios.delete(USER_API_BASE_URL + '/' + waitNO);
    }
    // addUser(reserve) {
    //     return axios.post(""+USER_API_BASE_URL, reserve);
    // }
//***** 여기까지 음식점 원격대기부분 *****

//***** 음식점 예약부분 *****
    fetchUserById(reservationNO) {
        return axios.get(USER_API_BASE_URL + '/' + reservationNO);
    }

    deletewaiting(reservationNO) {
        return axios.delete(USER_API_BASE_URL + '/' + reservationNO);
    }

//***** 여기까지 음식점 예약부분 *****


}



export default new ApiService();