import ApiService from "../apiServices";

class EntryService extends ApiService {

    constructor() {
        super('/api/entry')
    }

    search(entryFilter){
        // /api/entry?description='fefe'&year=2020&...
        let params = `?`
        if(entryFilter.year){
            params = `${params}&year=${entryFilter.year}`
        }
        if(entryFilter.mounth){
            params = `${params}&mounth=${entryFilter.mounth}`
        }
        if(entryFilter.type){
            params = `${params}&type=${entryFilter.type}`
        }
        if(entryFilter.status){
            params = `${params}&status=${entryFilter.status}`
        }
        if(entryFilter.description){
            params = `${params}&description=${entryFilter.description}`
        }
        if(entryFilter.user){
            console.log('tem user')
            params = `${params}&user=${entryFilter.user}`
        }
        console.log(params)
        return this.get(`/search${params}`)
        
    }
    
}

export default EntryService