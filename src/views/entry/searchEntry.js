import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import LocalStorageService from '../../app/service/localStorageService'
import SelectMenu from '../../components/selectMenu'
import EntryTable from './entryTable'
import EntryService from '../../app/service/entryService'
import UserService from '../../app/service/userService'

import {BiSearch} from 'react-icons/bi'
import {FaSave} from 'react-icons/fa'
import { errorPopUp, infoPopUp } from '../../components/toastr'

class SearchEntry extends React.Component{

    constructor(){
        super();
        this.entryService = new EntryService;
        this.userService = new UserService
    }

    state = {
        year: '',
        mounth: '',
        type: '',
        status: '',
        desciption: '',
        user: null,
        entryList: [],
        errorUserMessage: null,
        inputUserErrorClass: null,
        listOfUsers: []
    }
    
    componentDidMount(){
        this.userList()
    }
    userList = async () => {
        var list = [{label: 'Selecione...', value:''}]
        var apiList = []
        await this.userService.getAllUsers()
        .then(response => {
            apiList = response.data
            apiList.forEach(user => {
                list.push({label: user.email, value: user.id})
            });
        }).catch(error => {
            errorPopUp(error.response.data)
        })
        this.setState({listOfUsers: list})
    }


    resetView = () => {
        this.setState({errorUserMessage: null})
        this.setState({inputUserErrorClass: null})
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
     async test(e) {
        this.setState({desciption: e.target.value})
        await this.sleep(10);
        console.log('foi')
        this.search()
    }
    search = () => {
        console.log('entrou no search')
        console.log(this.state.desciption)
        const entryFilter = {
            year: parseInt(this.state.year),
            mounth: this.state.mounth,
            type: this.state.type,
            status: this.state.status,
            description: this.state.desciption,
            user: this.state.user
        }
        this.entryService.search(entryFilter)
        .then(response => {
            this.setState({entryList:response.data})
            if(!this.state.entryList.length){
                infoPopUp("Nenhum lançamento encontrado com os dados informados")
            }
        }).catch(error => {
            errorPopUp(error.response.data)
        })
        
    }
    render() {
        const yearList = this.entryService.getYearList()
        const typeList = this.entryService.getTypeList()
        const statusList = this.entryService.getStatusList()
        const mounthList =  this.entryService.getMounthList()
        return (
                   
            <div className="bs-docs-section">
                <Card title = "Buscar Lançamentos">
                    <div className = "col-md-12">
                    <div className="row">
                    <div className = "col-md-5">
                        <FormGroup label = "Ano " htmlFor = "InputYear">
                            <SelectMenu className="form-control"
                            list={yearList} 
                            value={this.state.year}
                            onChange={e => this.setState({year: e.target.value})}/>   
                        </FormGroup> 
                        </div>
                        <div className = "col-md-5">
                        <FormGroup label = "Mês " htmlFor = "InputMounth">
                            <SelectMenu className="form-control"
                                        list= {mounthList}
                                        value={this.state.mounth}
                                        onChange={e => this.setState({mounth: e.target.value})}/>
                        </FormGroup>
                        </div>
                        </div>
                        <div className = "row">
                        <div className = "col-md-5">
                        <FormGroup label = "Tipo de Lançamento " htmlFor = "InputType">
                            <SelectMenu className="form-control"
                                        list= {typeList} 
                                        value={this.state.type}
                                        onChange={e => this.setState({type: e.target.value})}/>
                        </FormGroup>
                        </div>
                        <div className = "col-md-5">
                        <FormGroup label = "Status do Lançamento " htmlFor = "InputStatus">
                            <SelectMenu className="form-control"
                                        list= {statusList} 
                                        value={this.state.status}
                                        onChange={e => this.setState({status: e.target.value})}/>
                        </FormGroup>
                        </div>
                        </div>
                        <div className = "row">
                        <div className = "col-md-5">
                        <FormGroup label = "Usuário " htmlFor = "InputUser">
                            <SelectMenu className="form-control"
                                        list= {this.state.listOfUsers} 
                                        value={this.state.user}
                                        onChange={e => this.setState({user: e.target.value})}/>
                        </FormGroup>
                        </div>
                        </div>
                        <div className = "row">
                        <div className = "col-md-10">
                        <FormGroup label = "Descrição " htmlFor = "InputDecription">
                            <textarea   className="form-control"
                                        id="InputDecription"
                                        style={{marginTop: '0px', marginBottom: '0px', height: '80px'}}
                                        placeholder="Digite a descrição"
                                        onChange = {e => this.test(e)} />
                        </FormGroup>
                        </div>
                        </div>
                        <button className="btn btn-success" onClick = {this.search}><BiSearch />  Buscar</button>
                        <button className="btn btn-danger right-button" 
                                onClick = {this.userList}><FaSave />  Cadastrar</button>
                        <div>{this.state.desciption}</div>
                    </div>
                    <div className="bs-docs-section">
                        <EntryTable list={this.state.entryList} />
                    </div>
                </Card>
            </div>
              
        )
    }

}

export default withRouter(SearchEntry)