import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { FaCheckSquare } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

class SingUp extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    signUp = () => {
        console.log(this.state)
    }

    render(){
        return(
            <div className = "container">
                <div className = "row">
                    <div className = "col-md-6" style = { {position : 'relative', left : '300px'} }>
                        {/* <div className="bs-docs-section"> */}
                            <Card title = "Cadastro de Usuário">
                            <fieldset>
                                    <FormGroup label = "Nome: " htmlFor = "InputName">
                                        <input type="text"
                                        className="form-control"
                                        name = "name"
                                        value = {this.state.name}
                                        onChange = {e => this.setState({name: e.target.value})}
                                        id="InputName"
                                        aria-describedby="NameHelp"
                                        placeholder="Digite seu nome" />
                                    </FormGroup>
                                    <FormGroup label = "Email: " htmlFor = "InputEmail">
                                        <input type="email"
                                        className="form-control"
                                        name = "email"
                                        value = {this.state.email}
                                        onChange = {e => this.setState({email: e.target.value})}
                                        id="InputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite seu Email" />
                                    </FormGroup>
                                    <FormGroup label = "Senha: " htmlFor = "InputPassword">
                                        <input type="password"
                                        className="form-control"
                                        name = "password"
                                        value = {this.state.password}
                                        onChange = {e => this.setState({password: e.target.value})}
                                        id="InputPassword"
                                        placeholder="Digite a senha" />
                                    </FormGroup>
                                    <FormGroup label = "Confirmação de Senha: " htmlFor = "InputConfirmPassword">
                                        <input type="password"
                                        className="form-control"
                                        value = {this.state.confirmPassword}
                                        onChange = {e => this.setState({confirmPassword: e.target.value})}
                                        id="InputConfirmPassword"
                                        placeholder="Repita a senha" />
                                    </FormGroup>
                                    <button className="btn btn-success" onClick={this.signUp} ><FaCheckSquare />  Cadastrar</button>
                                    <button className="btn btn-danger" ><FaTimes />  Cancelar</button>
                                </fieldset>
                            </Card>
                        {/* </div> */}
                    </div>
                </div>    
            </div>
        )
    }
}

export default SingUp