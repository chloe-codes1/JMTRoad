import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:1217';

class ApiService {

    //***** 음식점 주인 페이지*****
    loginOwner() {
        return axios.post('http://localhost:1217/owners/login' + '/' + 'ownerID', 'password')
    }

    fetchOwner() {
        return axios.get('http://localhost:1217/owners');
    }

    fetchOwnerById(ownerNo) {
        return axios.get(USER_API_BASE_URL + '/owners' + ownerNo);
    }
    
    fetchOwnerstore(ownerid, ownerpassword) {
        return axios.get('http://localhost:1217/owners/login/' + ownerid + '/' + ownerpassword)
    }
    
    //***** 음식점 페이지(store-info) *****
    fetchStoreinfo() {
        return axios.get(USER_API_BASE_URL + 'users');
    }
    
    StoreinfoaddUser(owner) {
        return axios.post("" + USER_API_BASE_URL + '/owners' + owner);
    }

    StoreinfoeditUser(owner) {
        return axios.put(USER_API_BASE_URL + '/owners' + '/' + owner.ownerNo, owner);
    }
    //****************************** 여기까지 음식점 페이지(store-info) ***********************************

    //***** 음식점 페이지의 리뷰작성부분 **********
    fetchReviews() {
        return axios.get('http://localhost:1217/storereview');
    }

    deleteReview(storereviewNo) {
        return axios.delete(USER_API_BASE_URL + '/' + storereviewNo);
    }
    //****************************** 여기까지 음식점 페이지의 리뷰작성부분 ***********************************

    //***** 음식점 원격대기부분 **********
    fetchWaiting(waitNO) {
        return axios.get(USER_API_BASE_URL + '/' + waitNO);
    }

    deletereserve(waitNO) {
        return axios.delete(USER_API_BASE_URL + '/' + waitNO);
    }
    
    // addUser(reserve) {
    //     return axios.post(""+USER_API_BASE_URL, reserve);
    // }

    //****************************** 여기까지 음식점 원격대기부분 ******************************

    //***** 음식점 예약부분 *****
    fetchReservation(reservationNO) {
        return axios.get(USER_API_BASE_URL + '/' + reservationNO);
    }

    deletewaiting(reservationNO) {
        return axios.delete(USER_API_BASE_URL + '/' + reservationNO);
    }
    //****************************** 여기까지 음식점 예약부분 ******************************

    //***** 음식점 랭킹부분 *****

        //** 음식점 좋아요 순위
    //     fetchstorelikes(){
    //         return axios.get('http://localhost:1217/');
    // }

        //** 음식점 별점 순위
    fetchstorestar(storereviewNo, nickname, star) {
        return axios.get('http://localhost:1217/store/' + storereviewNo + '/' + nickname + '/' + star)
    }
    // fetchstorestar(storereviewNo, nickname, star) {
    //     return axios.get('http://localhost:1217/storereview');
    // }

}



export default new ApiService();