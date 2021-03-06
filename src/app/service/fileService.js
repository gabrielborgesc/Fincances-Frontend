import ApiService from "../apiServices";
import ApiFileService from "../apiFileService";


class FileService extends ApiFileService {

    constructor() {
        super('/api/files')
    }

    upload(file){
        return this.post(`/uploadFile`, file)
    }

    mutipleUpload(files){
        return this.post(`/uploadMultipleFiles`, files)
    }
}

export default FileService