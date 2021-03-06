import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { FaTimes } from 'react-icons/fa'
import { BsCheck } from 'react-icons/bs'
import EmailService from '../../app/service/emailService'
import * as popUp from '../../components/toastr'
import HandleErrorService from '../../app/service/handleErrorService'
import ReactLoading from "react-loading";

class RequestToRecoverPassWord extends React.Component {

    constructor(){
        super();
        this.emailService = new EmailService();
    }

    state = {
        email: null,
        loading: false
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name]: value })
    }

    handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
        this.recoverPassword();
      }
    }

    recoverPassword = () => {
        this.setState({loading: true})
        this.emailService.recoverPassword({
            email: this.state.email,
            url: window.location.href
        }).then(response => {
            this.setState({loading: false})
            popUp.successPopUp('Link para recuperação de senha enviado por email')
            this.props.push('/login')
        }).catch(error => {
            this.setState({loading: false})
            HandleErrorService.handleError(this.props.push, error)
        })
        
    }

    render() {
        if(this.state.loading){
            return (
                <div 
                style = { { display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '600px'} }>
                      <ReactLoading type={"bars"} color={"#000066"} />
                </div>
             )
        }
        else
        {   
            return(
                <div className = "row">
                    <div className = "col-md-6" style = { {position : 'relative', left : '300px'} }>
                        <div className="bs-docs-section">
                            <Card title = "Recuperar Senha">
                                <fieldset>
                                    <FormGroup label = "Email: " htmlFor = "email">
                                        <input type="email"
                                        className={"form-control "}
                                        name="email"
                                        value = {this.state.email}
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite o Email"
                                        onChange={this.handleChange}
                                        onKeyPress={this.handleKeypress}/>
                                    </FormGroup>
                                    <button type="submit"
                                            className="btn btn-success" 
                                            onClick={this.recoverPassword}>
                                            <BsCheck />  Enviar</button>
                                    <button className="btn btn-danger right-button"
                                            onClick={() => this.props.push('/Login')} ><FaTimes />  Cancelar</button>
                                
                                </fieldset>
                            </Card>
                        </div>
                    </div>

                </div>
            )
        }
    }
}

export default RequestToRecoverPassWord