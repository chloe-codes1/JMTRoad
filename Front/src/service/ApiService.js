import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:9999/users';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(userNo) {
        return axios.get(USER_API_BASE_URL + '/' + userNo);
    }

    deleteUser(userNo) {
        return axios.delete(USER_API_BASE_URL + '/' + userNo);
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.userNo, user);
    }

}

export default new ApiService();