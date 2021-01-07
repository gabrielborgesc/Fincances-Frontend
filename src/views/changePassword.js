import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { FaSave } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import * as popUp from '../components/toastr'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../main/authProvider'
import UserService from '../app/service/userService'
import HandleErrorService from '../app/service/handleErrorService'

class ChangePassword extends React.Component{

    constructor(){
        super()
        this.userService = new UserService()
    }

    state = {
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        errorPasswordMessage: null, 
        inputPasswordErrorClass: null,
        errorNewPasswordMessage: null, 
        inputNewPasswordErrorClass: null,
        errorConfirmNewPasswordMessage: null,
        inputConfirmNewPasswordErrorClass: null

    }

    componentDidMount(){
        this.setState({email: this.context.userLoggedIn.email})
    }

    handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        this.setState( { [name]: value } )
    }

    checkData = () => {
        var check = true

        if(!this.state.currentPassword){
            this.setState({errorPasswordMessage: "Campo senha é obrigatório"})
            this.setState({inputPasswordErrorClass: "is-invalid"})    
            check=false        
        }
        if(!this.state.newPassword){
            this.setState({errorNewPasswordMessage: "Campo senha é obrigatório"})
            this.setState({inputNewPasswordErrorClass: "is-invalid"})    
            check=false        
        }
        if(!this.state.confirmNewPassword){
            this.setState({errorConfirmNewPasswordMessage: "Campo confirmação de senha é obrigatório"})
            this.setState({inputConfirmNewPasswordErrorClass: "is-invalid"})    
            check=false  
        }
        if(this.state.newPassword && this.state.confirmNewPassword && this.state.newPassword !== this.state.confirmNewPassword){
            console.log('entrou')
            this.setState({errorConfirmNewPasswordMessage: "As senhas não conferem"})
            this.setState({inputConfirmNewPasswordErrorClass: "is-invalid"})
            check=false
        }
        return check
    }

    changePassword = () => {
        if(this.checkData()){

            this.userService.changePassword({
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            }).then(response => {
                popUp.successPopUp("Senha alterada com sucesso")
                this.props.history.push('/login')
            }).catch(error => {
                if(!HandleErrorService.handleError(this.props.history.push, error)){
                    this.setState({errorPasswordMessage: error.response.data})
                    this.setState({inputPasswordErrorClass: "is-invalid"}) 
                }
            })
        }
    }

    handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
        this.changePassword();
      }
    }

    render(){
        return(
            <div className = "row">
                <div className = "col-md-6" style = { {position : 'relative', left : '300px'} }>
                    <div className="bs-docs-section">
                        <Card title = "Alterar Senha">
                            <fieldset>
                                <FormGroup label = "Email: " htmlFor = "email">
                                    <input type="email"
                                    className={"form-control "}
                                    value = {this.state.email}
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Email"
                                    disabled />
                                </FormGroup>
                                <FormGroup label = "Senha atual: " htmlFor = "currentPasswd">
                                    <input type="password"
                                    className={"form-control " + this.state.inputPasswordErrorClass}
                                    id="currentPasswd"
                                    name="currentPassword"
                                    value = {this.state.currentPassword}
                                    onChange = { this.handleChange }
                                    onKeyPress={this.handleKeypress}
                                    placeholder="Password" />
                                    <div className="invalid-feedback">{this.state.errorPasswordMessage}</div>
                                </FormGroup>
                                <FormGroup label = "Nova Senha: " htmlFor = "newPasswd">
                                    <input type="password"
                                    className={"form-control " }
                                    id="newPasswd"
                                    name="newPassword"
                                    value = {this.state.newPassword}
                                    onChange = { this.handleChange }
                                    onKeyPress={this.handleKeypress}
                                    placeholder="Password" />
                                </FormGroup>
                                <FormGroup label = "Confirmação da nova Senha: " htmlFor = "confNewPasswd">
                                    <input type="password"
                                    className={"form-control " + this.state.inputConfirmNewPasswordErrorClass}
                                    id="confirmPasswd"
                                    name="confirmNewPassword"
                                    value = {this.state.confirmNewPassword}
                                    onChange = { this.handleChange }
                                    onKeyPress={this.handleKeypress}
                                    placeholder="Password" />
                                    <div className="invalid-feedback">{this.state.errorConfirmNewPasswordMessage}</div>
                                </FormGroup>
                               
                                <button type="submit"
                                        className="btn btn-success" 
                                        onClick = {this.changePassword}>
                                        <FaSave />  Confirmar</button>
                                <button className="btn btn-danger right-button"
                                        onClick={() => this.props.history.push('/home')} ><FaTimes />  Cancelar</button>
                            
                            </fieldset>
                        </Card>
                    </div>
                </div>

            </div>
        )
    }

}
ChangePassword.contextType = AuthContext
export default withRouter( ChangePassword )