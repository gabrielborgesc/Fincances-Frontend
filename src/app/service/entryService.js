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
        return this.get(`/search${params}`)
        
    }
    
    deleteEntryById (id) {
        return this.delete(`/delete/${id}`)
    }

    getYearList() {
        var date = new Date()
        var currentYear = date.getFullYear()
        var list = [{label: 'Selecione...', value:''}]
        for (var i = 2000; i <= currentYear; i++) {
            list.push({label: i, value: i})
        }
        return list;
    }

    getTypeList(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Receita', value: 'RECEITA'},
            {label: 'Despesa', value: 'DESPESA'}
        ]
    }
    
    getStatusList (){ 
        return([
        {label: 'Selecione...', value: ''},
        {label: 'Pendente', value: 'PENDENTE'},
        {label: 'Confirmado', value: 'CONFIRMADO'},
        {label: 'Cancelado', value: 'CANCELADO'}
        ])
    }

    getMounthList () {
        return([
        {label: 'Selecione...',value: ''},
        {label: 'Janeiro',value: 1},
        {label: 'Fevereiro',value: 2},
        {label: 'Março',value: 3},
        {label: 'Abril',value: 4},
        {label: 'Maio',value: 5},
        {label: 'Junho',value: 6},
        {label: 'Julho',value: 7},
        {label: 'Agosto',value: 8},
        {label: 'Setembro',value: 9},
        {label: 'Outubro',value: 10},
        {label: 'Novembro',value: 11},
        {label: 'Dezembro',value: 12},
        ])
    }

}

export default EntryService