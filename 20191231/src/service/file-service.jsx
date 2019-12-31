import service from '../service'

export class FileService {
    uploadFileToServer(data){
        //returns Promise object
        return service.getRestClient().post('/files', data);
    }
}