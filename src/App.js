import React from 'react';
import Login from './views/login'
import SignUp from './views/signUp'
import 'bootswatch/dist/flatly/bootstrap.css'
import './css/custom.css'

class App extends React.Component {
  
  render(){
    return(
      <div>
        <SignUp />
      </div>
    );
  }
}

export default App;
