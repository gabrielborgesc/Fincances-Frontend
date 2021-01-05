import React from 'react';
import Routes from './routes'
import Navbar from '../components/navbar/navbar'

import 'toastr/build/toastr.min.js'
import '../css/_variables.scss'
import '../css/_bootswatch.scss'
import '../css/bootstrap.min.css'
import '../css/bootstrap.css'
// import '../css/myBootswatch.css'
import '../css/custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import AuthenticationProvider from './authProvider'

class App extends React.Component {

  render(){
    return(
      <AuthenticationProvider>
      <Navbar />
      <div className = "container">
        <Routes />
      </div>
      </AuthenticationProvider>
    );
  }
}

export default App;
