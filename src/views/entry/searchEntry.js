import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import {BiSearch} from 'react-icons/bi'
import {FaSave} from 'react-icons/fa'
import SelectMenu from '../../components/selectMenu'
import EntryTable from './entryTable'

class SearchEntry extends React.Component{

    state = {
        year: "",
        mounth: "",
        entryType: ""
    }

    render() {
        const yearList = () => {
            var date = new Date()
            var currentYear = date.getFullYear()
            var list = [{label: 'Selecione...', value:''}]
            for (var i = 2000; i <= currentYear; i++) {
                list.push({label: i, value: i})
        }
        return list;
    }
        const typeList = [
            {label: 'Selecione...', value: ''},
            {label: 'Receita', value: 'RECEITA'},
            {label: 'Despesa', value: 'DESPESA'}
        ]
        const mounthList = [
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
        ]
        return (
                   
            <div className="bs-docs-section">
                <Card title = "Buscar Lançamentos">
                    <div className = "col-md-5">
                        <FormGroup label = "Ano: " htmlFor = "InputYear">
                            <SelectMenu className="form-control" list={yearList()} />   
                        </FormGroup> 
                        <FormGroup label = "Mês " htmlFor = "InputMounth">
                            <SelectMenu className="form-control" list= {mounthList} />
                        </FormGroup>
                        <FormGroup label = "Tipo de Lançamento " htmlFor = "InputType">
                            <SelectMenu className="form-control" list= {typeList} />
                        </FormGroup>
                        <button className="btn btn-success" onClick = {this.login}><BiSearch />  Entrar</button>
                        <button className="btn btn-danger" onClick={this.signUp} ><FaSave />  Cadastrar</button>
                    </div>
                    <div className="bs-docs-section">
                        <EntryTable list={[]} />
                    </div>
                </Card>
            </div>
              
        )
    }

}

export default withRouter(SearchEntry)