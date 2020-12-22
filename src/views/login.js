import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { FaSave } from 'react-icons/fa'
import { FaSignInAlt } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component{
    
    state = {
        email: '',
        password: ''
    }

    login = () => {
        axios.post('http://localhost:8080/api/users/auth',
        {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response)
        })
    }

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
                                <button className="btn btn-danger" onClick={this.signUp} ><FaSave />  Cadastrar</button>
                            </fieldset>
                        </Card>
                    </div>
                </div>

            </div>
            
            
        )
    }
    
}

export default withRouter(Login)