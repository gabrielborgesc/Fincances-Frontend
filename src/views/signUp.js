import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { FaCheckSquare } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { withRouter } from 'react-router-dom'
import UserService from '../app/service/userService';
import { successPopUp, errorPopUp } from '../components/toastr';


class SingUp extends React.Component {

    constructor(){
        super();
        this.userService = new UserService;
    }

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorConfirmPasswordMessage: null,
        inputConfirmPasswordErrorClass: null,
        signUpSuccessInputClass: null
    }

    checkData = () => {
        return this.state.password === this.state.confirmPassword
    }

    signUp = () => {
        if(this.checkData()){
            this.userService.signUp({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                successPopUp('Usuário cadastrado com sucesso')
                this.setState({signUpSuccessInputClass: "is-valid"})
            }).catch(error => {
                errorPopUp(error.response.data)
                
            })
            this.setState({inputConfirmPasswordErrorClass: null})
            this.setState({errorConfirmPasswordMessage: null})
        }
        else{
            errorPopUp("As senhas não conferem")
            this.setState({errorConfirmPasswordMessage: "As senhas não conferem"})
            this.setState({inputConfirmPasswordErrorClass: "is-invalid"})
        }
    }

    cancel = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
            <div className = "row">
                <div className = "col-md-6" style = { {position : 'relative', left : '300px'} }>
                    <div className="bs-docs-section">
                        <Card title = "Cadastro de Usuário">
                        <fieldset>
                                <FormGroup label = "Nome: " htmlFor = "InputName">
                                    <input type="text"
                                    className={"form-control " + this.state.signUpSuccessInputClass}
                                    name = "name"
                                    value = {this.state.name}
                                    onChange = {e => this.setState({name: e.target.value})}
                                    id="InputName"
                                    aria-describedby="NameHelp"
                                    placeholder="Digite seu nome" />
                                </FormGroup>
                                <FormGroup label = "Email: " htmlFor = "InputEmail">
                                    <input type="email"
                                    className={"form-control " + this.state.signUpSuccessInputClass}
                                    name = "email"
                                    value = {this.state.email}
                                    onChange = {e => this.setState({email: e.target.value})}
                                    id="InputEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite seu Email" />
                                </FormGroup>
                                <FormGroup label = "Senha: " htmlFor = "InputPassword">
                                    <input type="password"
                                    className={"form-control " + this.state.signUpSuccessInputClass}
                                    name = "password"
                                    value = {this.state.password}
                                    onChange = {e => this.setState({password: e.target.value})}
                                    id="InputPassword"
                                    placeholder="Digite a senha" />
                                </FormGroup>
                                <FormGroup label = "Confirmação de Senha: " htmlFor = "InputConfirmPassword">
                                    <input type="password"
                                    className={"form-control " + this.state.inputConfirmPasswordErrorClass + " "
                                                + this.state.signUpSuccessInputClass}
                                    value = {this.state.confirmPassword}
                                    onChange = {e => this.setState({confirmPassword: e.target.value})}
                                    id="InputConfirmPassword"
                                    placeholder="Repita a senha" />
                                    <div class="invalid-feedback">{this.state.errorConfirmPasswordMessage}</div>
                                </FormGroup>
                                <button className="btn btn-success" onClick={this.signUp} ><FaCheckSquare />  Cadastrar</button>
                                <button className="btn btn-danger" onClick={this.cancel}><FaTimes />  Cancelar</button>
                            </fieldset>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SingUp)