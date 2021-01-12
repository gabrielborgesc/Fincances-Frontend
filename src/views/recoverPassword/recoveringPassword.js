import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import EmailService from '../../app/service/emailService'
import * as popUp from '../../components/toastr'
import HandleErrorService from '../../app/service/handleErrorService'
import { FaSave } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import UserService from '../../app/service/userService'

class RecoveringPassWord extends React.Component {

    constructor(){
        super();
        this.emailService = new EmailService();
        this.userService = new UserService();
    }

    state = {
        email: null,
        newPassword: '',
        confirmNewPassword: '',
        errorNewPasswordMessage: null, 
        inputNewPasswordErrorClass: null,
        errorConfirmNewPasswordMessage: null,
        inputConfirmNewPasswordErrorClass: null

    }

    componentDidMount() {
        this.userService.getUserFromNameAndHash(this.props.name, this.props.hash)
        .then(response => {
            this.setState( {email: response.data.email} )
        }).catch(error => {
            HandleErrorService.handleError(this.props.push, error)
        })
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name]: value })
    }

    handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
        this.redefinePassword();
      }
    }

    checkData = () => {
        var check = true

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

    resetView = () => {
        this.setState( {errorNewPasswordMessage: null} )
        this.setState( {inputNewPasswordErrorClass: null} )
        this.setState( {errorConfirmNewPasswordMessage: null} )
        this.setState( {inputConfirmNewPasswordErrorClass: null} )
    }

    redefinePassword = () => {
        
        this.resetView()

        if(this.checkData())
        {    this.userService.redefinePassword(this.props.name, this.props.hash, {
                passwd: this.state.newPassword
            }).then(response => {
                popUp.successPopUp("Senha alterada com sucesso")
                this.props.push('/login')
            }).catch(error => {
                HandleErrorService.handleError(this.props.push, error)
            })
        }
    }

    render(){
        if(this.state.email)
        {
            return(
                <div className = "row">
                    <div className = "col-md-6" style = { {position : 'relative', left : '300px'} }>
                        <div className="bs-docs-section">
                            <Card title = "Redefinir Senha">
                                <fieldset>
                                    <FormGroup label = "Email: " htmlFor = "email">
                                        <input type="email"
                                        className={"form-control "}
                                        value = {this.state.email}
                                        id="exampleInputEmail1"
                                        aria-describedby="email"
                                        disabled />
                                    </FormGroup>
                                    <FormGroup label = "Nova Senha: " htmlFor = "newPasswd">
                                        <input type="password"
                                        className={"form-control " + this.state.inputNewPasswordErrorClass }
                                        id="newPasswd"
                                        name="newPassword"
                                        value = {this.state.newPassword}
                                        onChange = { this.handleChange }
                                        onKeyPress={this.handleKeypress}
                                        placeholder="Password" />
                                        <div className="invalid-feedback">{this.state.errorNewPasswordMessage}</div>
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
                                            onClick = {this.redefinePassword}>
                                            <FaSave />  Confirmar</button>
                                    <button className="btn btn-danger right-button"
                                            onClick={() => this.props.push('/login')} ><FaTimes />  Cancelar</button>
                                
                                </fieldset>
                            </Card>
                        </div>
                    </div>

                </div>
        )}

        return false
    }

}

export default RecoveringPassWord