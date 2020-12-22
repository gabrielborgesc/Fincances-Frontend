import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { FaSave } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';

class Login extends React.Component{
    
    state = {
        email: '',
        password: ''
    }

    login = () => {
        console.log(this.state.email)
        console.log(this.state.password)
    }

    render(){
        return(
            <div className = "container">
                <div className = "row">
                    <div className = "col-md-6" style = { {position : 'relative', left : '300px'} }>
                        <div className="bs-docs-section">
                            <Card title = "Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label = "Email: " htmlFor = "exampleInputEmail1">
                                                    <input type="email"
                                                    className="form-control"
                                                    value = {this.state.email}
                                                    onChange = {e => this.setState({email: e.target.value})}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                                </FormGroup>
                                                <FormGroup label = "Senha: " htmlFor = "exampleInputPassword1">
                                                    <input type="password"
                                                    className="form-control"
                                                    value = {this.state.password}
                                                    onChange = {e => this.setState({password: e.target.value})}
                                                    id="exampleInputPassword1"
                                                    placeholder="Password" />
                                                </FormGroup>
                                                <button className="btn btn-success" onClick = {this.login}><FaSignInAlt />  Entrar</button>
                                                <button className="btn btn-danger" ><FaSave />  Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    
}

export default Login