import React from 'react'
import LocalStorageService from '../app/service/localStorageService';
import UserService from '../app/service/userService';

class Home extends React.Component {

    constructor(){
      super();
      this.userService = new UserService;
    }
    state = {
      balance: 0
    }

    componentDidMount(){
      const user = LocalStorageService.getItem("userLoggedIn")
      this.userService.getBalance(user.id)
        .then(response => {
          this.setState({balance: response.data})
        }).catch(error => {
          console.error(error.response)
        })
    }

    render(){
        return (
          <div className = "row">
                <div className = "col-md-10" style = { {position : 'relative', left : '100px'} }>
                    <div className="bs-docs-section">
                      <div className="jumbotron">
                      <h1 >Bem vindo!</h1>
                      <p >Esse é seu sistema de finanças.</p>
                      <p >Seu saldo para o mês atual é de R$ {this.state.balance}</p>
                      <hr className="my-4" />
                      <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                      <p className="lead">
                        <a className="btn btn-primary"
                        href="#/signUp"
                        role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                        <a className="btn btn-danger"
                        href="#/home"
                        role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                      </p>
                      </div>
                    </div>      
                </div>
            </div>    
        )
    }
}

export default Home