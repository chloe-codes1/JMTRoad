import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/owners';

class ApiService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchUserById(ownerNo) {
        return axios.get(USER_API_BASE_URL + '/' + ownerNo);
    }

    addOwners(owner) {
        return axios.post(""+USER_API_BASE_URL, owner);
    }   
    editOwner(owner){
        return axios.put(USER_API_BASE_URL+'/'+owner.ownerNo,owner)
    }
}

export default new ApiService();