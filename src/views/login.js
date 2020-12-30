import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { FaSave } from 'react-icons/fa'
import { FaSignInAlt } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import UserService from '../app/service/userService'
import LocalStorageService from '../app/service/localStorageService'
import {errorPopUp, successPopUp} from '../components/toastr'

class Login extends React.Component{
    
    constructor(){
        super();
        this.userService = new UserService;
    }

    state = {
        email: '',
        password: '',
        errorEmailMessage: null,
        inputEmailErrorClass: null,
        errorPasswordMessage: null,
        inputPasswordErrorClass: null
    }

    resetView = () => {
        this.setState({errorEmailMessage: null})
        this.setState({inputEmailErrorClass: null})
        this.setState({errorPasswordMessage: null})
        this.setState({inputPasswordErrorClass: null})
    }

    login = () => {
        this.resetView()
        this.userService.auth(
        {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            const user = response.data
            LocalStorageService.addItem('userLoggedIn', user)
            successPopUp("Login efetuado com sucesso")
            this.props.history.push(`/home/${user.name}/${user.email}`)
        }).catch(error => {
            var data = error.response.data
            if(data.toLowerCase().includes("email")){
            this.setState({errorEmailMessage: error.response.data})
            this.setState({inputEmailErrorClass: "is-invalid"})
            } else if(data.toLowerCase().includes("senha")){
                this.setState({errorPasswordMessage: error.response.data})
                this.setState({inputPasswordErrorClass: "is-invalid"})
            }
            errorPopUp(error.response.data)
        })
    }

    handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
        this.login();
      }
    };

    signUp = () => {
        this.props.history.push('/signUp')
    }

    render(){
        return(
            <div className = "row">
                <div className = "col-md-6" style = { {position : 'relative', left : '300px'} }>
                    <div className="bs-docs-section">
                        <Card title = "Login">
                            <fieldset>
                                <FormGroup label = "Email: " htmlFor = "exampleInputEmail1">
                                    <input type="email"
                                    className={"form-control " + this.state.inputEmailErrorClass}
                                    value = {this.state.email}
                                    onChange = {e => this.setState({email: e.target.value})}
                                    onKeyPress={this.handleKeypress}
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Email" />
                                    <div className="invalid-feedback">{this.state.errorEmailMessage}</div>
                                </FormGroup>
                                <FormGroup label = "Senha: " htmlFor = "exampleInputPassword1">
                                    <input type="password"
                                    className={"form-control " + this.state.inputPasswordErrorClass}
                                    value = {this.state.password}
                                    onChange = {e => this.setState({password: e.target.value})}
                                    onKeyPress={this.handleKeypress}
                                    id="exampleInputPassword1"
                                    placeholder="Password" />
                                    <div className="invalid-feedback">{this.state.errorPasswordMessage}</div>
                                </FormGroup>
                                <button type="submit" className="btn btn-success" onSubmit = {this.login}><FaSignInAlt />  Entrar</button>
                                <button className="btn btn-danger right-button"
                                onClick={this.signUp} ><FaSave />  Cadastrar</button>
                            </fieldset>
                        </Card>
                    </div>
                </div>

            </div>
            
            
        )
    }
    
}

export default withRouter(Login)