import axios from 'axios';

// const USER_API_BASE_URL = 'http://localhost:8080/owners';

class ApiService {

    fetchUsers() {
        return axios.get('http://localhost:8080/owners');
    }

    fetchUserById(ownerNo) {
        return axios.get('http://localhost:8080/owners' + '/' + ownerNo);
    }

    addOwners(owner) {
        return axios.post(""+'http://localhost:8080/owners', owner);
    }
       
    editOwner(owner){
        return axios.put('http://localhost:8080/owners'+'/'+owner.ownerNo,owner)
    }

    // loginOwner(){
    //     return axios.post('http://localhost:8080/owners/login/naver/1234')
    // }

        loginOwner(){
        return axios.post('http://localhost:8080/owners/login'+'/'+'ownerID' , 'password')
    }

    fetchownerstore(ownerid,ownerpassword){
        return axios.get('http://localhost:8080/owners/login/'+ownerid+'/'+ownerpassword)
    }

}

export default new ApiService();