import axios from 'axios';

// const USER_API_BASE_URL = 'http://localhost:8080/owners';

class ApiService {

    fetchOwners() {
        return axios.get('http://localhost:80/owners');
    }

    fetchOwnerById(ownerNo) {
        return axios.get('http://localhost:80/owners' + '/' + ownerNo);
    }

    addOwners(owner) {
        return axios.post(""+'http://localhost:80/owners', owner);
    }
       
    editOwner(owner){
        return axios.put('http://localhost:80/owners'+'/'+owner.ownerNo,owner)
    }

    fetchownerstore(ownerid,ownerpassword){
        return axios.get('http://localhost:80/owners/login/'+ownerid+'/'+ownerpassword)
    }

}

export default new ApiService();