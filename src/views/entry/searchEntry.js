import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import LocalStorageService from '../../app/service/localStorageService'
import SelectMenu from '../../components/selectMenu'
import EntryTable from './entryTable'
import EntryService from '../../app/service/entryService'
import UserService from '../../app/service/userService'
import GeneralServices from '../../app/service/generalServices'

import {BiSearch} from 'react-icons/bi'
import {FaSave} from 'react-icons/fa'
import {FiAlertTriangle} from 'react-icons/fi'
import * as popUp from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class SearchEntry extends React.Component{

    constructor(){
        super();
        this.entryService = new EntryService;
        this.userService = new UserService;
        this.generalServices = new GeneralServices;
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
        listOfUsers: [],
        displayConfirmation: false,
        idOfEntryToBeDeleted: null
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
            popUp.errorPopUp(error.response.data)
        })
        this.setState({listOfUsers: list})
    }


    resetView = () => {
        this.setState({errorUserMessage: null})
        this.setState({inputUserErrorClass: null})
    }
     async test(e) {
        await this.setState({desciption: e.target.value})
        this.search()
    }
    search = (showInfoPopUp) => {
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
            if(!this.state.entryList.length && showInfoPopUp){
                popUp.infoPopUp("Nenhum lançamento encontrado com os dados informados")
            }
        }).catch(error => {
            popUp.errorPopUp(error.response.data)
        })
        
    }

    editEntry = (id) => {
        console.log("edit entry ", id)
    }
    askForDeleteEntry = (entryId) => {
        this.setState({idOfEntryToBeDeleted: entryId})
        this.setState({displayConfirmation: true})
    }
    renderDeleteConfirmationFooter = () => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.cancelDeleteEntry()}
                        className="p-button-text" />
                <Button label="Confirmar" icon="pi pi-check"
                        onClick={() => this.deleteEntry(this.state.idOfEntryToBeDeleted)} autoFocus />
            </div>
        );
    }
    deleteEntry = async (id) => {
        console.log("delete entry ", id)
        await this.entryService.deleteEntryById(id)
        .then(response => {
            popUp.successPopUp("Lançamento deletado com sucesso")
        })
        .catch(error => {
            popUp.errorPopUp(error.response.data)
        })
        this.search()
        this.setState({idOfEntryToBeDeleted: null})
        this.setState({displayConfirmation: false})

    }
    cancelDeleteEntry = () => {
        this.setState({displayConfirmation: false})
        this.setState({idOfEntryToBeDeleted: null})
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
                        <button className="btn btn-success" onClick = {e => {this.search(true)} }><BiSearch />  Buscar</button>
                        <button className="btn btn-danger right-button" 
                                onClick = {this.userList}><FaSave />  Cadastrar</button>
                    </div>
                    <div className="bs-docs-section">
                        <EntryTable list={this.state.entryList}
                                    editButton = {this.editEntry}
                                    deleteButton = {this.askForDeleteEntry} />
                    </div>
                </Card>
                <Dialog header="Deletar lançamento"
                        visible={this.state.displayConfirmation}
                        modal = {true} //congela restante da tela
                        style={{ width: '350px' }}
                        footer={this.renderDeleteConfirmationFooter()}
                        onHide={() => this.setState({displayConfirmation: false})}>
                    <div className="confirmation-content row" style={{marginLeft: '10px'}}>
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem', marginRight: '10px'}} />
                        <div style={{marginBottom: '10px'}}> Deseja confirmar deleção? </div>
                    </div>
                </Dialog>
            </div>
              
        )
    }

}

export default withRouter(SearchEntry)