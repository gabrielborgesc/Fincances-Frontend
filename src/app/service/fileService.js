import ApiService from "../apiServices";
import ApiFileService from "../apiFileService";


class FileService extends ApiFileService {

    constructor() {
        super('/api/files')
    }

    upload(file){
        return this.post(`/uploadFile`, file)
    }

}

export default FileService